import React, { useState, useEffect } from 'react'

import { useStateContext } from '../context'
import DisplayBought from '../components/DisplayBought';

const Bought = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayBought 
      title="Artworks Bought"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Bought