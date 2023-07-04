import React from "react";
import PostCol from "../PostCol";
import postimg1 from "../../../../Images/col-img.png";

const PostSection = (props) => {
  const data = [
    {
      title: "We are",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla. Duis feugiat purus a libero scelerisque, ut imperdiet eros facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id rutrum nulla. Duis feugiat purus a libero scelerisque, ut imperdiet eros facilisis.",
      imageUrl: postimg1,
      buttonOneUrl: "abc.con",
      buttonTwoUrl: "abc.com",
    },
  ];
  return (
    <>
      <PostCol data={data} />
    </>
  );
};

export default PostSection;
