import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box-fade">Reviews(122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Ecommerce is one way people buy and sell things in retail. Some
          companies sell products online only, while other sellers use ecommerce
          as a part of a broader strategy that includes physical stores and
          other distribution channels. Either way, ecommerce allows startups,
          small businesses, and large companies to sell products at scale and
          reach customers across the world.
        </p>
        <p>
          An e-commerce website is one that allows people to buy and sell
          physical goods, services, and digital products over the internet
          rather than at a brick-and-mortar location. Through an e-commerce
          website, a business can process orders, accept payments, manage
          shipping and logistics, and provide customer service.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
