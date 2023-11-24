import React, { useState } from 'react';
import { Web3Button, useAddress, useContract, useContractMetadata, useContractRead } from '@thirdweb-dev/react';
import HeroCard from '../../components/hero-card';
import styles from '../../styles/Home.module.css';
import { PROFILE_STATUS_CONTRACT_ADDRESS } from '../../constants/addresses';

const ProfileStatusProject = () => {
    const address = useAddress();
    const { contract } = useContract(PROFILE_STATUS_CONTRACT_ADDRESS);

    const { data: contractMetadata, isLoading: contractMetadataIsLoading } = useContractMetadata(contract);

    const { data: userStatus, isLoading: userStatusIsLoading } = useContractRead(contract, 'userStatus', [address]);

    const [status, setStatus] = useState('');

    const updateStatus = async () => {
        try {
            if (!userStatus.exists) {
                await contract?.call('createStatus', [status]);
            } else {
                await contract?.call('updateStatus', [status]);
            }
            setStatus('');
        } catch (error) {
            // Handle specific errors here if needed
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <h3>Current Status</h3>
                        {userStatusIsLoading ? 'Loading...' : userStatus && userStatus.exists ? userStatus.statusMessage : <i>No status yet</i>}
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Update Status</h3>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                            }}
                        >
                            <input
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '2rem',
                                    marginBottom: '1rem',
                                }}
                            />
                            <Web3Button contractAddress={PROFILE_STATUS_CONTRACT_ADDRESS} action={updateStatus}>
                                Update Status
                            </Web3Button>
                        </div>
                    </div>
                    <div className={styles.componentCard}>
                        <h3>Status Exists</h3>
                        {userStatusIsLoading ? 'Loading...' : userStatus.exists ? 'True' : 'False'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStatusProject;
