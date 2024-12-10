/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";

export const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/getAgents"
        );
        setAgents(response.data.sellers); // Assuming the controller returns sellers in "sellers"
        setLoading(false);
      } catch (err) {
        setError("Failed to load agents. Please try again.");
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return <div>Loading agents...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <section>
        <h1 className="container-header">Agents</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <Card
              key={agent.id} // Use a unique key
              title={agent.name}
              subtitle={agent.agency || "Unknown Location"} // Replace with actual location field if available
              imageUrl={`http://localhost:3000/uploads/images/${agent.image}`}
              buttons={[
                {
                  label: "Call",
                  onClick: () => {
                    window.location.href = `tel:${agent.phoneNumber}`;
                  },
                },
              ]}
              Links={[
                {
                  label: "Message",
                  url: `/messages/${agent.id}`,
                },
              ]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
