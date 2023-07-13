import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';


import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const ArtworkSoldDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { donate, getDonations, contract, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [donators, setDonators] = useState([]);

    const remainingDays = daysLeft(state.deadline);

    const fetchDonators = async () => {
        const data = await getDonations(state.pId);
        setDonators(data);
    };

    useEffect(() => {
        if (contract) fetchDonators();
    }, [contract, address]);

    const handleDonate = async () => {
        setIsLoading(true);
        await donate(state.pId, amount);

        navigate('/');
        setIsLoading(false);
    };

    const [selectedPhases, setSelectedPhases] = useState([]);

    const handlePhaseChange = (phase) => {
        if (selectedPhases.includes(phase)) {
            setSelectedPhases(selectedPhases.filter((p) => p !== phase));
        } else {
            setSelectedPhases([...selectedPhases, phase]);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}

            <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                <div className="flex-1 flex-col">
                    <img
                        src={state.image}
                        alt="campaign"
                        className="w-full h-[410px] object-cover rounded-xl"
                    />
                    {/* <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%' }}
            ></div>
          </div> */}
                </div>

                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                    <CountBox title="Quantity Left" value={4} />
                    <CountBox title={'Price'} value={'Eth 0.5'} />
                    <CountBox title="Quantity Sold" value={5} />
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">The Art Title</h4>

                        <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">AuthorName</h4>
                                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">Author Username</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Description</h4>

                        <div className="mt-[20px]">
                            <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                {state.description}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Delivery Phases</h4>
                        {/* Four checkboxes for delivery phases */}
                        <div className="flex flex-col gap-2 mt-2 font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] space-between text-justify">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedPhases.includes('Dispatched')}
                                    onChange={() => handlePhaseChange('Dispatched')}

                                />
                                Dispatched from the Warehouse
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedPhases.includes('DeliveryService')}
                                    onChange={() => handlePhaseChange('DeliveryService')}
                                />
                                In Possession of the Delivery Service
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedPhases.includes('Delivered')}
                                    onChange={() => handlePhaseChange('Delivered')}
                                />
                                Delivered
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Buy Now</h4>

                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                        <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                            Buy the ArtWork
                        </p>
                        <div className="mt-[30px]">
                            {/* <input
                type="number"
                placeholder="ETH 0.5"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                onChange={(e) => setAmount(e.target.value)}
                readOnly
              /> */}

                            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">ETH 0.5</h4>
                            </div>

                            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Love the artwork?</h4>
                                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                                    Buy it now before it runs out!
                                </p>
                            </div>

                            <CustomButton
                                btnType="button"
                                title="Buy"
                                styles="w-full bg-[#8c6dfd]"
                                handleClick={handleDonate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkSoldDetails;