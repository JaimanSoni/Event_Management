import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function EventDashboard() {
    const { id } = useParams()

    const loadBasicBookDetails = async () => {
        return 0;
    }

    return (
        <div>
            {/* sidebar */}
            <div>
                <div className="main-container">
                    <div className="sub-main-container">
                        <div className="top-contsiner">
                            <p className='logo bg-slate-600'>Planorama</p>
                        </div>
                        <div className="bottom-contsiner">
                            <ul>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                                <li><span><img src="logo.svg" alt="" /></span> <span>Home</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
