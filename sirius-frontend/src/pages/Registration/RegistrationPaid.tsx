import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay.tsx";
import {numberOfColumnsStyle} from "../../shared/numberOfColumnsStyle.tsx";
import {columnsStyle} from "../../shared/columnsStyle.tsx";

export const RegistrationPaid: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
            setStatus('error');
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/stripe/session-status/${sessionId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'complete' && data.paymentStatus === 'paid') {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            })
            .catch(() => setStatus('error'));
    }, []);

    if (status === 'loading') return <LoadingOverlay />;

    return (
        <div className="VerificationRequest__verification-request">
            <div className="Grid_grid__container Grid_grid__container__margin"
                 style={numberOfColumnsStyle(16)}>
                <div className="Grid_grid__item"
                     style={columnsStyle(1, 9, 1, 9, 3, 16, 3, 16)}>
                    <h3 className="VerificationRequest__title">Online payment is being technically updated, and you have not been charged. <br/> Please eTransfer <br/>
                        $100 + HST: 13% = $113 <br/>
                        to office@siriustalent.ca</h3>
                </div>
            </div>
        </div>
    );
};
