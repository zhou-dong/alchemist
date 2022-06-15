import { ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.light,
    },
    minWidth: 70,
    minHeight: 35,
    fontSize: 14,
    padding: 0,
}));

const booleanToString = (data: boolean): string => data ? 'TRUE' : 'FALSE';

const cellContent = (data: number | string | boolean) => {
    return (typeof data === 'boolean') ? booleanToString(data) : data;
};

export interface Props {
    readonly buttons: Array<number | string | boolean>;
    readonly buttonsStyles: Array<React.CSSProperties>;
    readonly handleButtonClick: (data: number | string | boolean) => any; // Action;
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
        <ButtonGroup size="large" key={0} style={{ marginTop: "20px" }}>
            {buttons.map((data, index) => cell(index, data, buttonsStyles[index], { ...props }))}
        </ButtonGroup>
    );
};

export default Buttons;
