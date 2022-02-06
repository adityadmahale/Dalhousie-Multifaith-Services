import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChaplain } from "../services/chaplains";

const ChaplainDetails = () => {
  const { id } = useParams();
  const [chaplain, setChaplain] = useState({
    id: "",
    name: "",
    title: "",
    image: "",
    availability: "",
    description: "",
  });

  useEffect(() => {
    const getData = async () => {
      const data = await getChaplain(id);
      setChaplain(data);
    };

    getData();
  });

  return <div>ChaplainDetails {chaplain.name}</div>;
};

export default ChaplainDetails;
