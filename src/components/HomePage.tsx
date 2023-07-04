import React, { useState, useCallback, useEffect, Suspense } from "react";
import NavBar from "./NavBar";
import classes from "../styles/HomePage.module.css";
import Link from "next/link";
import { Input, Select } from "antd";
import styled from "@emotion/styled";
import axios from "axios";

enum CurrencyType {
  PAY,
  BUY,
}

const handleChange = (value: string): void => {
  console.log(`StyledSelected ${value}`);
};

const HomePage: React.FC = () => {
  const [coins, setCoins] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});
  const [payCurrency, setPayCurrency] = useState<string>("");
  const [buyCurrency, setBuyCurrency] = useState<string>("");
  const [payAmount, setPayAmount] = useState<number>(0);
  const [buyAmount, setBuyAmount] = useState<number>(0);

  const fetchCoinsHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get("/api/rates");
      const { data } = response;

      setCoins(Object.keys(data));
      setData(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch coins.");
    }
  }, []);

  useEffect(() => {
    fetchCoinsHandler();
  }, []);

  useEffect(() => {
    if (payCurrency && buyCurrency) {
      calculateBuyAmount();
    }
  }, [payCurrency, buyCurrency]);

  const calculateBuyAmount = () => {
    const buyCurrencyValue = data[buyCurrency]?.USD || 0;
    const payCurrencyValue = data[payCurrency]?.USD || 0;

    console.log("payCurrencyValue:", payCurrencyValue);
    console.log("buyCurrencyValue:", buyCurrencyValue);
    console.log("payAmount:", payAmount);

    const result = (payAmount * payCurrencyValue) / buyCurrencyValue;
    console.log("result:", result);
    setBuyAmount(result);
  };

  const handleSelectChange = (value: string, inputType: CurrencyType) => {
    if (inputType === CurrencyType.PAY) {
      setPayCurrency(value);
      // calculateBuyAmount(value);
    } else if (inputType === CurrencyType.BUY) {
      setBuyCurrency(value);
    }
  };

  const getExchange = async () => {
    const { data } = await axios.get("/api/exchange", {
      params: {
        payCurrency,
        buyCurrency,
      },
    });

    console.log(data);
  };

  useEffect(() => {
    getExchange();
  }, []);

  let content: JSX.Element | null = null;

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className={classes.container}>
      <NavBar />
      <div className={classes.backCard}>
        <div className={classes.box1}>
          <p className={classes.p1}>
            Buy Bitcoin,{" "}
            <span className={classes.whitetitle}>
              Ethereum, Litecoin and other crypto
            </span>{" "}
            online
          </p>
          <p className={classes.p2}>
            Why bother going through complicated exchanges? Buy cryptocurrency
            with top payment methods like SEPA bank transfer, Credit and Debit
            Card, Apple Pay, Mobile balance or Klarna. You can buy Bitcoin,
            Ethereum or any other popular crypto directly to your personal
            wallet without making any initial deposits. It's as easy as it gets!
          </p>
          <Link onClick={() => alert('You clicked start!')} className={classes.li} href="">
            Start now
          </Link>
        </div>

        <div className={classes.box2}>
          <div className={classes.card2}></div>
          <div className={classes.card1}>
            <div className={classes.pay1}>
              <Input
                placeholder="Pay"
                // value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
              />
              <StyledSelect
                defaultValue=""
                onChange={(value) =>
                  handleSelectChange(value, CurrencyType.PAY)
                }
                options={[
                  { value: "", label: "" },
                  ...coins.map((coin) => ({
                    value: coin,
                    label: coin,
                  })),
                ]}
              />
            </div>
            <div className={classes.pay2}>
              <Input placeholder="Buy" value={buyAmount} disabled />
              <StyledSelect
                defaultValue=""
                onChange={(value) =>
                  handleSelectChange(value, CurrencyType.BUY)
                }
                options={[
                  { value: "", label: "" },
                  ...coins.map((coin) => ({
                    value: coin,
                    label: coin,
                  })),
                ]}
              />
            </div>
            <p className={classes.p3}>Payment method</p>

            <div className={classes.transfer}>
              <StyledSelectPayment
                defaultValue=""
                onChange={handleChange}
                options={[
                  { value: "", label: "" },
                  { value: "sepa", label: "SEPA bank transfer" },
                  { value: "creditdebit", label: "Credit and Debit Card" },
                  { value: "apple", label: "Apple Pay" },
                  { value: "mobile", label: "Mobile balance" },
                  { value: "klarna", label: "Klarna" },
                ]}
              />
            </div>
            <button className={classes.button}>Buy {buyCurrency}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledSelect = styled(Select<string>)`
  width: 120px;

  &.ant-select-single:not(.ant-select-customize-input) {
    .ant-select-selector {
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
    }
  }
`;

const StyledSelectPayment = styled(Select<string>)`
  width: 100%;
  height: 100%;

  &.ant-select-single:not(.ant-select-customize-input) {
    .ant-select-selector {
      height: 100%;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center
    }
    }
  }
`;

export default HomePage;
