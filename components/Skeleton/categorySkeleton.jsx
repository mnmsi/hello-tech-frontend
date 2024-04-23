import React from "react";
import { Placeholder } from "react-bootstrap";

const CategorySkeleton = ({ count }) => {
  let renderSkeleton = [];
  for (let i = 0; i < count; i++) {
    renderSkeleton.push(
      <React.Fragment key={i}>
        <Placeholder
          xs={12}
          animation={"glow"}
          style={{
            width: "15%",
            height: "50px",
            borderRadius: "100px",
            backgroundColor: "#ddd",
          }}
        />
      </React.Fragment>
    );
  }
  return <> {renderSkeleton} </>;
};

export default CategorySkeleton;
