import React, { useEffect } from "react";
import { Web3 } from "web3";
import {
  environment,
  stackingABI,
  stackingAddress,
  tokenABI,
  tokenAddress,
} from "../ABI/tokenABI";
import { notifyError, notifyInfo } from "../utils/toast";
import Navbar from "./Navbar";

const Hero = () => {
  const [input, setInput] = React.useState("");
  const [totalStackAmount, setTotalStackAmount] = React.useState(1);
  const [balance, setBalance] = React.useState(0);
  const [ownerAddress, setOwnerAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (!window.ethereum) {
      notifyError("Please install metamask");
    } else if (
      environment == "development" &&
      window.ethereum &&
      window.ethereum?.networkVersion != "11155111"
    ) {
      notifyError("Please switch to the correct network");
    } else if (
      environment == "production" &&
      window.ethereum &&
      window.ethereum?.networkVersion != "1"
    ) {
      notifyError("Please switch to the ethereum network");
    }
  }, []);

  let web3;
  if (environment == "development") {
    web3 = new Web3(window.ethereum);
  } else if (environment == "production") {
    web3 = new Web3(window.ethereum);
  }
  console.log(web3, "web3");

  let tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

  let stackingContract = new web3.eth.Contract(stackingABI, stackingAddress);
  console.log(input, "input");

  const MAX_INT =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  const approveTx = async () => {
    if (ownerAddress == "") {
      notifyError("Please connect wallet");
      return;
    }
    if (input == "") {
      notifyError("Please enter amount");
      return;
    }
    setLoading(true);
    // console.log("1");
    const decimal = await tokenContract.methods.decimals().call();
    // console.log("2");
    // const amount = String(BigInt(Math.round(input * 10 ** Number(decimal))));
    const amount = web3.utils.toWei(input, "ether");
    console.log(amount, typeof amount);
    // return;
    const allowance = await tokenContract.methods
      .allowance(ownerAddress, stackingAddress)
      .call();

    console.log(String(allowance), "allowance");
    if (String(allowance) > "0" && String(allowance > amount)) {
      console.log("in the if", stackingContract.methods);
      const stakeVar = stackingContract.methods.stake(amount);
      const gas = await web3.eth.estimateGas({
        from: ownerAddress,
        to: stackingAddress,
        data: stakeVar.encodeABI(),
      });
      console.log(gas, "gas");
      // return;
      console.log(stakeVar, "stakeVar");
      const txObject = {
        from: ownerAddress,
        to: stackingAddress,
        gas: gas * BigInt(2),
        data: stakeVar.encodeABI(),
      };
      console.log(txObject, "txObject");

      try {
        const stHash = await web3.eth.sendTransaction(txObject);
        setInput("");
        setLoading(false);
        notifyInfo("Staking successful");
      } catch (error) {
        setInput("");
        setLoading(false);
        console.log(error);
      }
    } else {
      try {
        console.log(amount, "amount");
        const gas = await web3.eth.estimateGas({
          from: ownerAddress,
          to: tokenAddress,
          data: tokenContract.methods
            .approve(stackingAddress, MAX_INT)
            .encodeABI(),
        });
        const txObject = {
          from: ownerAddress,
          to: tokenAddress,
          gas: gas * BigInt(2),
          data: tokenContract.methods
            .approve(stackingAddress, MAX_INT)
            .encodeABI(),
        };

        const txHash = await web3.eth.sendTransaction(txObject);

        if (txHash && String(txHash.status) === "1") {
          console.log("stacking");
          const decimal = await tokenContract.methods.decimals().call();
          const gas = await web3.eth.estimateGas({
            from: ownerAddress,
            to: stackingAddress,
            data: stackingContract.methods.stake(amount).encodeABI(),
          });
          const txObject = {
            from: ownerAddress,
            to: stackingAddress,
            gas: gas * BigInt(2),
            data: stackingContract.methods.stake(amount).encodeABI(),
          };

          const stHash = await web3.eth.sendTransaction(txObject);
          setLoading(false);
          notifyInfo("Staking successful");
          setInput("");
          console.log(stHash, "stHash");
        }
      } catch (e) {
        setLoading(false);
        setInput("");
        notifyError(e.message || "staking failed");
        console.log(e);
      }
    }
    // console.log("approve");
  };

  const totalSTackAmount = async () => {
    const totalStack = await stackingContract.methods
      .stakers(ownerAddress)
      .call();
    const decimal = await tokenContract.methods.decimals().call();
    const tsa = BigInt(totalStack.totalStakedAmount);
    const totalStackAmount = Number(tsa / BigInt(10 ** Number(decimal)));
    setTotalStackAmount(totalStackAmount);
    // console.log(totalStackAmount, "totalStackAmount");

    return totalStackAmount;
  };

  const fetchBalance = async () => {
    const balance = await tokenContract.methods.balanceOf(ownerAddress).call();
    setBalance(Number(BigInt(balance) / BigInt(10 ** 18)));
    console.log(balance, "balance");
    return balance;
  };

  useEffect(() => {
    if (ownerAddress) {
      totalSTackAmount();
      fetchBalance();
    }

    // setTotalStackAmount(rs);
  }, [totalStackAmount, balance, ownerAddress]);

  console.log(totalStackAmount, "totalStackAmount");

  const botArray = [
    {
      id: 1,
      value: 31250,
      name: "LEGO",
      src: "/LEGO.png",
    },
    {
      id: 2,
      value: 62500,
      name: "MECATRON",
      src: "/MECATRON.png",
    },
    {
      id: 3,
      value: 125000,
      name: "FLEX",
      src: "/FLEX.png",
    },
    {
      id: 4,
      value: 250000,
      name: "ULTROID",
      src: "/ULTROID.png",
    },
  ];

  let imageToDisplay = {
    src: "",
    name: "",
  };

  for (let i = 0; i < botArray.length && totalStackAmount; i++) {
    if (i == 0 && totalStackAmount <= botArray[i].value) {
      imageToDisplay.src = botArray[i].src;
      imageToDisplay.name = botArray[i].name;
      break;
    } else if (
      botArray[0].value < totalStackAmount &&
      totalStackAmount <= botArray[i].value
    ) {
      imageToDisplay.src = botArray[i].src;
      imageToDisplay.name = botArray[i].name;
      break;
    } else if (
      i == botArray.length - 1 &&
      totalStackAmount > botArray[i].value
    ) {
      imageToDisplay.src = botArray[i].src;
      imageToDisplay.name = botArray[i].name;
      break;
    }
  }

  return (
    <div id="hero" className="w-full relative overflow-hidden">
      <Navbar
        ownerAddress={ownerAddress}
        setOwnerAddress={setOwnerAddress}
        balance={balance}
        stakeBalance={totalStackAmount}
      />
      <section className="hero relative justify-center w-full pt-[40px] vsm:pt-[80px] xl:pt-[90px] flex  2xl:justify-between flex-col gap-[60px] xl:gap-0 items-center xl:items-start xl:flex-row px-[16px] vsm:px-[20px] xmd:px-[50px] xl:pl-[80px]">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <div className="flex justify-center gap-5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-[30px] px-8 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter amount"
              required
            />
            <button
              disabled={loading}
              onClick={() => approveTx()}
              placeholder="Amount"
              className="text-neutral-900 block text-xl font-medium leading-5 tracking-normal justify-center items-stretch shadow-sm bg-white self-center  max-w-full px-8 py-2.5 rounded-[30px]"
            >
              {loading ? "Staking..." : "Stake"}
            </button>
          </div>

          <div className=" mt-[100px]">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Values
                    </th>
                    <th scope="col" className="px-6 py-3">
                      APY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Levels
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      0-31250
                    </th>
                    <td className="px-6 py-4">60</td>
                    <td className="px-6 py-4">Lego</td>
                  </tr>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      32150-62500
                    </th>
                    <td className="px-6 py-4">90</td>
                    <td className="px-6 py-4">Mechatron</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      62500-125000
                    </th>
                    <td className="px-6 py-4">150</td>
                    <td className="px-6 py-4">Flex</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      125000-250000
                    </th>
                    <td className="px-6 py-4">300</td>
                    <td className="px-6 py-4">Ultroid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="w-[90%] md:w-[45%] flex justify-center flex-col 2xl:w-fit">
          {/* <img className="" src={heroImg} alt="hero image" /> */}
          <div>
            {" "}
            <img
              className=" w-[450px] h-[450px] object-cover"
              src={imageToDisplay.src}
              alt="Bot"
            />
            <p className="font-bold text-2xl text-center text-white">
              {imageToDisplay.name}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
