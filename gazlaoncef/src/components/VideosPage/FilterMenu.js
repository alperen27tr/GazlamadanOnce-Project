import React from 'react';
import 'assets/css/FilterMenu.css';
import { Button } from 'reactstrap';

const FilterMenu = ({ onFilterChange }) => {
    const buttons = [
        { label: 'Tüm Videolar', filterKey: 'all' },
        { label: 'Eğitim Videoları', filterKey: 'education' },
        { label: 'Eğlence Videoları', filterKey: 'entertainment' },
        { label: 'İnceleme Videoları', filterKey: 'reviews' },
        { label: 'Kaza Analiz', filterKey: 'accidentAnalysis' },
        { label: 'Altın Elbiseli Adam', filterKey: 'altin_elbiseli_adam' }
    ];

    return (
        <div className="filter-menu-container">
            <div className="button-group">
                {buttons.map((btn) => (
                    <Button
                        key={btn.filterKey}
                        className={`btn-round ${btn.filterKey === 'altin_elbiseli_adam' ? 'special-button' : ''}`}
                        color={btn.filterKey === 'altin_elbiseli_adam' ? null : 'danger'}
                        style={{
                            marginBottom: '10px',
                            marginRight: '10px',
                            ...(btn.filterKey === 'altin_elbiseli_adam' && {
                                backgroundColor: '#ccbe08',
                                color: 'white',
                                border: 'none' 
                            })
                        }}
                        onClick={() => onFilterChange(btn.filterKey)}
                    >
                        {btn.label}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default FilterMenu;
