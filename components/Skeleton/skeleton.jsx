"use client";
import React from "react";
import { Placeholder, Card } from "react-bootstrap";

const Skeleton = ({ count, type, isNotRow }) => {
  let renderSkeleton = [];
  for (let i = 0; i < count; i++) {
    renderSkeleton.push(
      <div
        className={`${isNotRow ? "col-6 col-md-4" : "col-md-3 col-6"} mb-4`}
        key={i}
      >
        <Card
          style={{
            border: "1px solid #f1f1f1",
            borderRadius: "0",
            boxShadow: "none",
            width: "100%",
            height: "100%",
          }}
        >
          <Placeholder animation="glow">
            <Placeholder
              style={{
                width: "100%",
                height: "200px",
                backgroundColor: "#d9d9d9",
              }}
              xs={6}
            />
          </Placeholder>
          <Card.Body>
            <Placeholder animation="glow">
              <Placeholder
                xs={6}
                style={{
                  backgroundColor: "#d9d9d9",
                }}
              />
            </Placeholder>
            <Placeholder animation="glow">
              <Placeholder
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                xs={7}
              />
              <Placeholder
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                xs={4}
              />
              <Placeholder
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                xs={4}
              />
              <Placeholder
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                xs={6}
              />
              <Placeholder
                style={{
                  backgroundColor: "#d9d9d9",
                }}
                xs={8}
              />
            </Placeholder>
          </Card.Body>
        </Card>
      </div>
    );
  }
  return isNotRow ? (
    <>{renderSkeleton}</>
  ) : (
    <div className="row pe-0">{renderSkeleton}</div>
  );
};

export default Skeleton;
