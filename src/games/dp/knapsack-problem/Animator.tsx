import * as React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import Backpack from './svgs/Backpack';
import Book from './svgs/Book';

const DesktopGrid = styled(Grid)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('lg')]: {
        display: 'block',
    },
    borderLeft: "1px solid lightgray",
}));

const MobileGrid = styled(Grid)(({ theme }) => ({
    display: 'block',
    [theme.breakpoints.up('lg')]: {
        display: 'none',
    },
    margin: 'auto', textAlign: 'center',
}));

interface Props {
    table: Array<Array<any>>;
    maxWeight: number;
    currentWeight: number;
    currentValue: number;
    potentialValue: number;
    currentRow: number;
}

const DesktopAnimator = ({ table, maxWeight, currentWeight, currentValue, potentialValue, currentRow }: Props) => (
    <DesktopGrid item md={6}>
        <div style={{ float: "left", marginLeft: "70px", marginRight: "80px" }}>
            <Backpack
                height={400}
                maxWeight={maxWeight}
                currentValue={currentValue}
                currentWeight={currentWeight}
                potentialValue={potentialValue}
            />
        </div>
        {
            table.slice(2).map((row, index) =>
                <div key={index}>
                    <Book
                        id={index}
                        weight={row[1]}
                        height={100}
                        fillColor={currentRow === index + 2 ? "lightgreen" : "lightgray"}
                        weightColor={currentRow === index + 2 ? "black" : "lightgray"}
                        valueColor={currentRow === index + 2 ? "black" : "lightgray"}
                        value={row[0]}
                        width={100}
                    />
                </div>
            )
        }
    </DesktopGrid>
);

const MobileAnimator = ({ table, maxWeight, currentWeight, currentValue, potentialValue, currentRow }: Props) => (
    <MobileGrid item md={12}>
        <div>
            <Backpack
                height={400}
                maxWeight={maxWeight}
                currentValue={currentValue}
                currentWeight={currentWeight}
                potentialValue={potentialValue}
            />
        </div>
        {
            table.slice(2).map((row, index) =>
                <Book
                    key={index}
                    id={index}
                    weight={row[1]}
                    height={100}
                    fillColor={currentRow === index + 2 ? "lightgreen" : "lightgray"}
                    weightColor={currentRow === index + 2 ? "black" : "lightgray"}
                    valueColor={currentRow === index + 2 ? "black" : "lightgray"}
                    value={row[0]}
                    width={100}
                />
            )
        }
    </MobileGrid >
);

const Animator = (props: Props) => (
    <React.Fragment>
        <DesktopAnimator {...props} />
        <MobileAnimator {...props} />
    </React.Fragment>
);

export default Animator;
