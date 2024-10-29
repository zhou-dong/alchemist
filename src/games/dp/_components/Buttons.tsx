import React from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(ToggleButton)(({ theme }) => ({
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.light,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    '&&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        color: "#fff",
    },
    height: 60,
    width: 70,
    fontSize: 20,
    color: "#000",
    fontWeight: "normal",
    borderRadius: "8%",
}));

const booleanToString = (data: boolean): string => data ? 'TRUE' : 'FALSE';

const cellContent = (data: number | string | boolean) => {
    return (typeof data === 'boolean') ? booleanToString(data) : data;
};

export interface Props {
    readonly buttons: Array<number | string | boolean>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly handleButtonClick: (data: number | string | boolean) => any;
}

const cell = (
    selected: number | string | boolean | undefined,
    key: number,
    data: number | string | boolean,
    style: React.CSSProperties,
    setData: React.Dispatch<React.SetStateAction<string | number | boolean | undefined>>,
    { handleButtonClick }: Props
) => (
    <StyledButton
        value={data}
        size="large"
        key={key}
        style={style}
        onClick={() => {
            handleButtonClick(data);
            setData(data);
        }}
        selected={selected === data}
    >
        {cellContent(data)}
    </StyledButton>
);

const Buttons = (props: Props) => {
    const [data, setData] = React.useState<number | string | boolean>();

    const { buttons, buttonsStyles } = props;
    if (buttons.length !== buttonsStyles.length) {
        throw new Error('Alchemy Buttons errors: array-styles size dont match');
    }
    return (
        <ToggleButtonGroup
            value={data}
            size="large"
            sx={{
                marginTop: "40px",
                borderColor: "gray"
            }}
        >
            {buttons.map((d, index) => cell(data, index, d, buttonsStyles[index], setData, { ...props }))}
        </ToggleButtonGroup>
    );
};

export default Buttons;
