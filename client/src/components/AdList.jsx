import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useListQuery } from "../slices/adApiSlice";
import DataListResolver from "./DataListResolver";
import { useNavigate } from "react-router-dom";

import React from "react";
import { usePeer } from "../hooks/peers";

const Ads = () => {
  const { filter } = useSelector((state) => state.ad);

  const { data: ads, status } = useListQuery(filter);

  const { userInfo } = useSelector((state) => state.auth);

  const { peerControls } = usePeer();

  const [connectState, setConnectState] = React.useState("unconnected");
  const navigate = useNavigate();

  const handleConnect = (ad) => {
    if (!userInfo) {
      navigate("/login");
    }

    peerControls.initPeer({ id: ad.user_id, isInitiator: true });

    setConnectState("connecting");
  };

  const handleManage = () => {
    navigate("/manage");
  };

  return (
    <DataListResolver status={status} list={ads}>
      <div className="p-4 flex w-full h-fit flex-wrap">
        {ads &&
          ads.map((ad) => (
            <Card key={ad._id} className={"flex w-[24rem] min-h-[36rem] max-h-[36rem] p-4 mr-4 mb-4"}>
              <div
                className={
                  "rounded-full w-[16px] aspect-square absolute top-[-8px] right-[-8px] " +
                  (ad.isOnline ? "bg-green-400 animate-ping" : "bg-gray-400")
                }
              ></div>
              {ad.isOnline && (
                <div
                  className={"rounded-full w-[16px] aspect-square absolute top-[-8px] right-[-8px] bg-green-400"}
                ></div>
              )}
              <Card.Title>{ad.name}</Card.Title>
              <Card.Text className="max-h-[90%] overflow-y-scroll">{ad.description}</Card.Text>
              {userInfo && userInfo._id === ad.user_id ? (
                <Button className="mt-auto" onClick={() => handleManage(ad)}>
                  Manage
                </Button>
              ) : (
                <Button className="mt-auto" onClick={() => handleConnect(ad)}>
                  Connect
                </Button>
              )}
            </Card>
          ))}
      </div>
    </DataListResolver>
  );
};

export default Ads;
