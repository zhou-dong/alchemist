import { ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.light,
        color: "#fff",
    },
    minHeight: 55,
    width: 85,
    fontSize: 20,
    color: "#000",
    fontWeight: "normal",
    padding: 0,
    borderColor: "lightgray",
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
    key: number,
    data: number | string | boolean,
    style: React.CSSProperties,
    { handleButtonClick }: Props
) => (
    <StyledButton size="large" key={key} style={style} onClick={() => handleButtonClick(data)}>
        {cellContent(data)}
    </StyledButton>
);

const Buttons = (props: Props) => {
    const { buttons, buttonsStyles } = props;
    if (buttons.length !== buttonsStyles.length) {
        throw new Error('Alchemy Buttons errors: array-styles size dont match');
    }
    return (
        <ButtonGroup size="large" key={0} sx={{ marginTop: "20px", borderColor: "gray" }}>
            {buttons.map((data, index) => cell(index, data, buttonsStyles[index], { ...props }))}
        </ButtonGroup>
    );
};

export default Buttons;
