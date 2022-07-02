import { Grid, InputLabel, SelectChangeEvent, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { FormControl } from "@mui/material";
import { Select } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { Avatar, Chip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LRUCache from "./LRUCache";
import nbaTeams from "./nba_teams.json" // fetch nba teams from: "https://www.balldontlie.io/api/v1/teams"

import { styled } from '@mui/material/styles';

const DisplayTeamCell = styled(TableCell)(() => ({
    fontSize: "12px",
    height: "30px",
    border: "1px solid black",
    width: "100px",
    textAlign: "center"
}));

const TeamCell = styled(TableCell)(({ theme }) => ({
    display: 'flex',
    '& > *': {
        margin: theme.spacing(0.2),
    },
    color: "grey",
    padding: 0,
    border: "none"
}));

const TeamIndex = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0,
}));

interface Team {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

const teams: Team[] = nbaTeams["data"];
const capacity = 8;
const cache: LRUCache<Team> = new LRUCache(capacity);

interface SelectorParams {
    setButtionsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    setResult: React.Dispatch<React.SetStateAction<Team | undefined>>;
    setSize: React.Dispatch<React.SetStateAction<number>>
}

const GetSelector = ({ setButtionsDisabled, setResult }: SelectorParams) => {
    const [id, setId] = useState(1);

    const handleChange = async (event: SelectChangeEvent<{ value: unknown }>) => {
        const selected = parseInt(event.target.value + "");
        setButtionsDisabled(true);
        const result = await cache.get(selected);
        setId(selected);
        if (result) {
            setResult(getTeam(selected));
        } else {
            setResult(undefined);
        }
        setButtionsDisabled(false);
    };

    return (
        <>
            <InputLabel htmlFor="get-by-id">GET: (KEY)</InputLabel>
            <Select
                native
                value={id as any}
                onChange={handleChange}
                inputProps={{ id: "get-by-id" }}
                color="primary"
            >
                {teams.map((team, i) => <option key={i} value={team["id"]}>{team["id"]}</option>)}
            </Select>
            <FormHelperText>Get item by key from cache.</FormHelperText>
        </>
    );
};

const getTeam = (id: number): Team => {
    return teams.filter(team => team.id === id)[0];
}

const PutSelector = ({ setButtionsDisabled, setResult, setSize }: SelectorParams) => {

    const handleChange = async (event: SelectChangeEvent<{ value: unknown }>) => {
        setButtionsDisabled(true);
        const selected = parseInt(event.target.value + "");
        const team = getTeam(selected);
        const size = await cache.put(selected, team, team["abbreviation"]);
        setResult(getTeam(selected));
        setButtionsDisabled(false);
        setSize(size);
    };

    return (
        <>
            <InputLabel htmlFor="put-team">PUT: (KEY, VALUE)</InputLabel>
            <Select
                native
                onChange={handleChange}
                inputProps={{ id: 'put-team' }}
                color="primary"
            >
                {
                    teams.map((team, i) => <option key={i} value={team["id"]}>{team["id"]}, {team["full_name"]}</option>)
                }
            </Select>
            <FormHelperText>Save or Update item in cache.</FormHelperText>
        </>
    );
};

const Teams = () => {
    const subs: Team[][] = [];
    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const level = Math.floor(i / 2);
        if (!subs[level]) {
            subs.push([]);
        }
        subs[level].push(team);
    }
    return (
        <div
            style={{
                position: "fixed",
                top: "40px",
                right: "30px"
            }}
        >
            <Typography align="center" variant="body2" style={{ color: "gray" }}>NBA TEAMS</Typography>
            <Table >
                <TableBody>
                    <TableRow>
                        {
                            subs.map((sub, i) =>
                                <TeamCell key={i}>
                                    {
                                        sub.map((team, j) =>
                                            <Chip
                                                style={{ color: "gray" }}
                                                key={j}
                                                label={team["abbreviation"]}
                                                avatar={<Avatar key={j} style={{ color: "white" }}>{team["id"]}</Avatar>}
                                            />
                                        )
                                    }
                                </TeamCell>
                            )
                        }
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

interface ResultParams {
    team?: Team;
}

const Result = ({ team }: ResultParams) => {
    return (
        <Grid container
            sx={{
                justifyContent: "center",
                position: "fixed",
                bottom: "200px",
                width: "100%",
                color: "gray",
            }}
        >
            <Grid item>
                <Table >
                    <TableBody>
                        <TableRow>
                            <DisplayTeamCell padding="none">Id</DisplayTeamCell>
                            <DisplayTeamCell padding="none">Abbr</DisplayTeamCell>
                            <DisplayTeamCell padding="none">Name</DisplayTeamCell>
                            <DisplayTeamCell padding="none">Full Name</DisplayTeamCell>
                            <DisplayTeamCell padding="none">City</DisplayTeamCell>
                            <DisplayTeamCell padding="none">Conference</DisplayTeamCell>
                            <DisplayTeamCell padding="none">Division</DisplayTeamCell>
                        </TableRow>

                        <TableRow>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.id}</DisplayTeamCell>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.abbreviation}</DisplayTeamCell>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.name}</DisplayTeamCell>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.full_name}</DisplayTeamCell>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.city}</DisplayTeamCell>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.conference}</DisplayTeamCell>
                            <DisplayTeamCell padding="none" style={{ color: "gray" }}>{team && team.division}</DisplayTeamCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default () => {
    const ref = useRef<HTMLDivElement>(null);

    window.addEventListener('resize', () => {
        if (ref.current) {
            cache.resize(ref.current);
        }
    });

    useEffect(() => {
        if (ref && ref.current && ref.current.children.length === 0) {
            cache.resize(ref.current);
            cache.render();
            ref.current.appendChild(cache.domElement);
        }
    });

    const [buttionsDisabled, setButtionsDisabled] = useState(false);
    const [result, setResult] = useState<Team | undefined>(undefined);
    const [size, setSize] = useState<number>(0);

    return (
        <>
            <Typography
                sx={{
                    position: "fixed",
                    top: "80px",
                    width: "100%",
                }}
                align="center"
            >
                Least Recently Used (LRU) cache
            </Typography>

            <Table sx={{
                position: "fixed",
                top: "100px",
                left: "30px",
                color: "gray",
                width: "120px",
            }}>
                <TableBody>
                    <TableRow>
                        <DisplayTeamCell padding="none" style={{ fontWeight: "bold" }}>capacity</DisplayTeamCell>
                        <DisplayTeamCell padding="none">{capacity}</DisplayTeamCell>
                    </TableRow>
                    <TableRow>
                        <DisplayTeamCell padding="none" style={{ fontWeight: "bold" }}>size</DisplayTeamCell>
                        <DisplayTeamCell padding="none">{size}</DisplayTeamCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Result team={result} />

            <Teams />

            <div ref={ref} style={{ overflow: "hidden" }} />

            <Grid
                container
                spacing={5}
                sx={{
                    position: "fixed",
                    bottom: "70px",
                    width: "100%",
                    justifyContent: "center",
                }}
            >
                <Grid item>
                    {
                        buttionsDisabled ?
                            <FormControl disabled>
                                <GetSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} setSize={setSize} />
                            </FormControl> :
                            <FormControl>
                                <GetSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} setSize={setSize} />
                            </FormControl>
                    }
                </Grid>
                <Grid item>
                    {
                        buttionsDisabled ?
                            <FormControl disabled>
                                <PutSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} setSize={setSize} />
                            </FormControl> :
                            <FormControl>
                                <PutSelector setButtionsDisabled={setButtionsDisabled} setResult={setResult} setSize={setSize} />
                            </FormControl>
                    }
                </Grid>
            </Grid>
        </>
    );
};
