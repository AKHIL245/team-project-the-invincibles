import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const SubscriptionCard = () => {
  const history = useHistory();
  return (
    <Subscriptions>
      <Subscription>
        <div className="offer" >
        <p>FitLife Basic</p>
          <div className="pricing"  >
          <p>3 Months </p>
            <div className="price">
              <div className="old">$ 299 </div>
              <div className="new">$ 199 </div>
            </div>
          </div>
          <div className="pricing">
          <p>6 Months </p>
            <div className="price">
              <div className="old">$ 449 </div>
              <div className="new">$ 349 </div>
            </div>
          </div>
          <div className="pricing">
          <p>12 Months </p>
            <div className="price">
              <div className="old">$ 699 </div>
              <div className="new">$ 599 </div>
            </div>
          </div>
        </div>
        <div className="tag">
          <img src="img/cult/tag.svg" alt="tag" />
          <p>Ends Tonight I Get FREE 2 Month Extension</p>
        </div>
      </Subscription>
      <Subscription>
        <div className="offer" >
        <p>FitLife Pro</p>
          <div className="pricing"  >
          <p>3 Months </p>
            <div className="price">
              <div className="old">$ 320 </div>
              <div className="new">$ 220 </div>
            </div>
          </div>
          <div className="pricing">
          <p>6 Months </p>
            <div className="price">
              <div className="old">$ 469 </div>
              <div className="new">$ 369 </div>
            </div>
          </div>
          <div className="pricing">
          <p>12 Months </p>
            <div className="price">
              <div className="old">$ 720 </div>
              <div className="new">$ 620 </div>
            </div>
          </div>
        </div>
        <div className="tag">
          <img src="img/cult/tag.svg" alt="tag" />
          <p>Ends Tonight I Get FREE 2 Month Extension</p>
        </div>
      </Subscription>
      <Subscription>
        <div className="offer" >
        <p>FitLife Elite</p>
          <div className="pricing"  >
          <p>3 Months </p>
            <div className="price">
              <div className="old">$ 359 </div>
              <div className="new">$ 259 </div>
            </div>
          </div>
          <div className="pricing">
          <p>6 Months </p>
            <div className="price">
              <div className="old">$ 499 </div>
              <div className="new">$ 399 </div>
            </div>
          </div>
          <div className="pricing">
          <p>12 Months </p>
            <div className="price">
              <div className="old">$ 769 </div>
              <div className="new">$ 669 </div>
            </div>
          </div>
        </div>
        <div className="tag">
          <img src="img/cult/tag.svg" alt="tag" />
          <p>Ends Tonight I Get FREE 2 Month Extension</p>
        </div>
      </Subscription>
    </Subscriptions>
  );
};

export default SubscriptionCard;

//Styled components;

const Subscriptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1%;
  padding-bottom: 40px;
`;

const Subscription = styled.div`
  width: 65%;
  min-width: 250px;
  color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  margin: 14px 0px;

  & .offer {
    background: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 13%) 0px 2px 4px 0px;
    padding: 10px 20px;
    cursor: pointer;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }

  & .buy {
    border-radius: 100px;
    align-self: center;
    padding: 0px 0px 0px 5px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    color: rgb(255, 50, 120);
    margin: 0px;
  }

  & .tag {
    display: grid;
    border-radius: 10px;
    align-items: self-start;
    grid-template-columns: 12% auto;
    background: linear-gradient(to right, black 33%, rgba(255, 255, 255, 0) 0%)
      center top / 13px 1px repeat-x rgb(247, 247, 247);
    padding: 10px;
    width: 100%;

    & img {
      width: 15px;
    }

    & p {
      color: rgb(54, 54, 54);
      font-size: 12px;
      font-weight: normal;
      padding: 3px 0px 0px;
      margin: 0px;
    }
  }

  & p {
    overflow: hidden;
    font-size: 16px;
    font-weight: bold;
    margin: 0px;
  }

  & .price {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    flex-flow: row;
    width: fit-content;

    & .old {
      min-width: fit-content;
      font-family: BrandonTextWeb-Medium, "Helvetica Neue", Helvetica, Roboto,
        Arial, sans-serif;
      color: rgba(0, 0, 0, 0.34);
      text-decoration: line-through;
      margin-right: 6px;
    }

    & new {
      min-width: fit-content;
      color: rgb(0, 0, 0);
      font-weight: bold;
    }
  }
`;
