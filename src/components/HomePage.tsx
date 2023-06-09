import React, { useState, useCallback, useEffect } from "react";
import NavBar from "./NavBar";
import classes from "../styles/HomePage.module.css";
import Link from "next/link";
import { Input, Select } from "antd";
import styled from "@emotion/styled";
import axios from "axios";

enum CurrencyType {
  PAY,
  BUY
}

const handleChange = (value: string): void => {
  console.log(`StyledSelected ${value}`);
};

const HomePage: React.FC = () => {
  const [coins, setCoins] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});
  const [payCurrency, setPayCurrency] = useState<string>('');
  const [buyCurrency, setBuyCurrency] = useState<string>('');
  const [payAmount, setPayAmount] = useState<number>(0);
  const [buyAmount, setBuyAmount] = useState<number>(0);

  const fetchCoinsHandler = useCallback(async () => {
    setError(null);
    try {
      const { data } = await axios.get("/api/rates");
    
      setCoins(Object.keys(data));
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
  }, [payCurrency, buyCurrency, payAmount]);

  const calculateBuyAmount = () => {
    const payCurrencyValue = data[payCurrency]?.USD || 0;
    const buyCurrencyValue = data[buyCurrency]?.USD || 0;
    const result = (payAmount * buyCurrencyValue) / payCurrencyValue;
    setBuyAmount(result);}

  const handleSelectChange = (value: string, inputType: CurrencyType) => {
    
    if (inputType === CurrencyType.PAY) {
      setPayCurrency(value);
      // calculateBuyAmount(value);
    }else if (inputType === CurrencyType.BUY){
      setBuyCurrency(value);
    }
  };

  // const calculateBuyAmount = (currency: string) => {
  //   const currencyValue = data[currency]?.USD || 0;
  //   const result = payAmount * currencyValue;
  //   setBuyAmount(result);
  // };

  let content: JSX.Element | null = null;

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className={classes.container}>
      <NavBar />
      <div className={classes.backCard}></div>
      <p className={classes.p1}>
        Buy Bitcoin, Ethereum, Litecoin and other crypto online
      </p>
      <p className={classes.p2}>
        Why bother going through complicated exchanges? Buy cryptocurrency with
        top payment methods like SEPA bank transfer, Credit and Debit Card,
        Apple Pay, Mobile balance or Klarna. You can buy Bitcoin, Ethereum or
        any other popular crypto directly to your personal wallet without making
        any initial deposits. It's as easy as it gets!
      </p>
      <div>
        <Link className={classes.li} href="">
          Start now
        </Link>
      </div>
      <div className={classes.card2}></div>
      <div className={classes.card1}></div>
      <div className={classes.pay1}>
        <Input
          placeholder="Pay"
          value={payAmount}
          onChange={(e) => setPayAmount(Number(e.target.value))}
        />
        <StyledSelect
          defaultValue=""
          onChange={(value) => handleSelectChange(value, CurrencyType.PAY)}
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
          onChange={(value) => handleSelectChange(value, CurrencyType.BUY)}
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
      <button className={classes.button}>Buy</button>
    </div>
  );
};

const StyledSelect = styled(Select<string>)`
  width: 120px;

  &.ant-select-single:not(.ant-select-customize-input) {
    .ant-select-selector {
      height: 100%;
    }
  }
`;

const StyledSelectPayment = styled(Select<string>)`
  width: 100%;
  height: 100%;

  &.ant-select-single:not(.ant-select-customize-input) {
    .ant-select-selector {
      height: 100%;
    }
  }
`;

export default HomePage;
