import React from "react";
import { Placeholder } from "react-bootstrap";

const BrandSkeleton = ({ count, height }) => {
  let renderSkeleton = [];
  for (let i = 0; i < count; i++) {
    renderSkeleton.push(
      <div key={i}>
        <Placeholder as="span" animation="glow">
          <Placeholder
            xs={12}
            style={{
              width: "100%",
              height: height ? height : "100px",
              backgroundColor: "#ddd",
            }}
          />
        </Placeholder>
      </div>
    );
  }
  return <> {renderSkeleton} </>;
};

export default BrandSkeleton;
