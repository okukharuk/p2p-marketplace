import { Container, Card, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useListQuery } from "../slices/adApiSlice";
import DataListResolver from "./DataListResolver";
import { useNavigate } from "react-router-dom";

import Peer from "simple-peer";
import React from "react";
import { usePeer } from "../hooks/peers";
import { useSocketControl } from "../hooks/socket";

const Ads = () => {
  const { data: ads, status, ...elsee } = useListQuery({});
  const { userInfo } = useSelector((state) => state.auth);

  const { socket } = useSocketControl();
  const { savePeer, peerControls } = usePeer();

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
            <Card key={ad._id} className={"flex w-[24rem] max-h-full min-h-[36rem] p-4 mr-4 mb-4"}>
              <div
                className={
                  "rounded-full w-[16px] aspect-square absolute top-[-8px] right-[-8px] " +
                  (ad.isOnline ? "bg-green-400" : "bg-gray-400")
                }
              ></div>
              <Card.Title>{ad.name}</Card.Title>
              <Card.Text>{ad.description}</Card.Text>
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
