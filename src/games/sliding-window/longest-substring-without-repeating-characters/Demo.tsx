// import * as React from 'react';
// import { Centered } from "../../dp/_components/Centered";
// import { title } from "./contents";
// import { Button, CardContent, Stack, Typography } from '@mui/material';
// import { CheckCircleOutline } from '@mui/icons-material';
// import InputDisplay from './AlgoInputDisplay';
// import HashTable from './HashTable';
// import AlgoInstructions from './AlgoInstructions';
// import { Range } from "./InputTable";
// import {
//     defaultIndex,
//     defaultMax,
//     defaultLeft,
//     defaultRange,
//     buildDefaultMap
// } from "./AlgoInput";

// interface Props {
//     alignment: string;
//     setAlignment: React.Dispatch<React.SetStateAction<string>>;
// }

// const Main = ({ alignment, setAlignment }: Props) => {

//     const [success, setSuccess] = React.useState(false);
//     const [input, setInput] = React.useState("");
//     const [max, setMax] = React.useState(defaultMax);
//     const [left, setLeft] = React.useState(defaultLeft);
//     const [index, setIndex] = React.useState(defaultIndex);
//     const [map, setMap] = React.useState<Map<string, number>>(buildDefaultMap());
//     const [range, setRange] = React.useState<Range>();

//     const handleClick = () => {
//         if (success) {
//             return;
//         }

//         if (index === input.length - 1) {
//             setSuccess(true);
//             return;
//         }

//         const i = index + 1;
//         const character = input.charAt(i);

//         let newLeft = left;
//         const prev = map.get(character);
//         if (prev !== undefined) {
//             newLeft = Math.max(left, prev + 1);
//         }
//         if (newLeft === -1) {
//             newLeft = 0;
//         }
//         map.set(character, i);
//         setLeft(newLeft);
//         setMax(Math.max(max, i - newLeft + 1));
//         setIndex(i);
//         setMap(map);
//         if (i - newLeft + 1 > max) {
//             setRange({ left: newLeft, right: i });
//         }
//     }

//     const HTable = () => {
//         const key = (index > 0 && index < input.length) ? input.charAt(index) : ""
//         return (
//             <CardContent>
//                 <Typography variant="subtitle1" sx={{ color: "gray" }}>
//                     Hash Table
//                 </Typography>
//                 <HashTable map={map} currentKey={key} input={input} />
//             </CardContent>
//         );
//     }

//     const HInput = () => (
//         <CardContent>
//             <Typography variant="subtitle1" sx={{ color: "gray" }}>
//                 Input
//             </Typography>
//             <InputDisplay input={input} index={index} range={range} left={left} />
//         </CardContent>
//     );

//     const HNext = () => (
//         <Button variant="contained" onClick={handleClick} disabled={success} sx={{ marginTop: "80px" }}>
//             next
//         </Button>
//     );

//     const Title = () => (
//         <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} direction="row">
//             <Typography variant='body1'>
//                 {title}
//             </Typography>
//             {success && <CheckCircleOutline sx={{ color: 'green' }} />}
//         </Stack>
//     );

//     return (
//         <>
//             <AlgoInstructions
//                 alignment={alignment}
//                 setAlignment={setAlignment}
//                 setInput={setInput}
//                 setIndex={setIndex}
//                 setRange={setRange}
//                 setMap={setMap}
//                 setLeft={setLeft}
//                 setSuccess={setSuccess}
//                 setMax={setMax}
//             />
//             <Centered>
//                 <div style={{ marginTop: "60px" }} />
//                 <Title />
//                 <div style={{ marginTop: "60px" }} />
//                 {input.length > 0 && <HTable />}
//                 {input.length > 0 && <HInput />}
//                 {input.length > 0 && <HNext />}
//             </Centered>
//         </>
//     );
// }

// export default Main;

const Main = () => {

    return (
        <>
            main
        </>
    )
}

export default Main;
