import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { duration, linkLength, radius, skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';

const skinEnabledColor = "blue";
const skinSecondaryColor = "pink";

const MainPosition = styled("div")({
    position: "fixed",
    bottom: 200,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
});

const enableColor = (node: LinkedListNode<number> | undefined, color: string) => {
    if (node) {
        node.nodeSkin.color = color;
    }
}

const resetColor = (node: LinkedListNode<number> | undefined) => {
    if (node) {
        node.nodeSkin.color = skinDefaultColor;
        resetColor(node.next);
    }
}

const Play = () => {
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode } = useAlgoContext();

    const execute = async (step: Step) => {
        const {
            action,
            head,
            merge_head1,
            merge_head2,
            merge_dummyHead,
            merge_temp,
            merge_temp1,
            merge_temp2,
            sort_head,
            sort_tail,
            sort_slow,
            sort_fast,
            sort_list1,
            sort_list2
        } = step;

        resetColor(head);
        resetColor(merge_head1);
        resetColor(merge_head2);
        resetColor(merge_dummyHead);
        resetColor(merge_temp);
        resetColor(merge_temp1);
        resetColor(merge_temp2);
        resetColor(sort_head);
        resetColor(sort_head);
        resetColor(sort_tail);
        resetColor(sort_slow);
        resetColor(sort_fast);
        resetColor(sort_list1);
        resetColor(sort_list2);

        switch (action) {
            case Action.stand_by: {
                enableColor(head, skinEnabledColor);
                break;
            };
            case Action.merge_entry: {
                enableColor(merge_head1, skinEnabledColor);
                enableColor(merge_head2, skinEnabledColor);
                break;
            };
            case Action.merge_new_dummy_head: {
                enableColor(merge_dummyHead, skinEnabledColor);
                if (merge_dummyHead && merge_head1) {
                    const { x, y, z } = merge_head1;
                    merge_dummyHead.show();
                    await merge_dummyHead.move({ x: x - linkLength, y: y - radius * 3, z }, duration);
                }
                break;
            };
            case Action.merge_define_temp_temp1_temp2: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_meet_while_condition: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_while_temp1_less_than_temp2: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_while_temp_next_temp1: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinSecondaryColor);

                if (merge_temp && merge_temp1) {
                    const { x, y, z, linkToNext } = merge_temp;
                    if (linkToNext) {
                        linkToNext.target = merge_temp1;
                        linkToNext.refresh();
                        linkToNext.show();
                    }
                    await merge_temp1.move({ x: x + linkLength, y, z }, duration, () => {
                        merge_temp.linkToNext?.refresh();
                        merge_temp1.linkToNext?.refresh();
                    })
                }
                break;
            };
            case Action.merge_while_temp1_temp1_next: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinSecondaryColor);
                break;
            };
            case Action.merge_while_temp1_large_than_temp2: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_while_temp_next_temp2: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);

                if (merge_temp && merge_temp2) {
                    const { x, y, z, linkToNext } = merge_temp;
                    if (linkToNext) {
                        linkToNext.target = merge_temp2;
                        linkToNext.refresh();
                        linkToNext.show();
                    }
                    await merge_temp2.move({ x: x + linkLength, y, z }, duration, () => {
                        merge_temp.linkToNext?.refresh();
                        merge_temp2.linkToNext?.refresh();
                    })
                }
                break;
            };
            case Action.merge_while_temp2_temp2_next: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_while_temp_temp_next: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_temp1_not_null: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_temp_next_temp1: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);

                if (merge_temp && merge_temp1) {
                    const { x, y, z, linkToNext } = merge_temp;
                    if (linkToNext) {
                        linkToNext.target = merge_temp1;
                        linkToNext.refresh();
                        linkToNext.show();
                    }
                    await merge_temp1.move({ x: x + linkLength, y, z }, duration, () => {
                        merge_temp1.linkToNext?.refresh();
                        merge_temp1.linkToNext?.refresh();
                    })
                }
                break;
            };
            case Action.merge_temp2_not_null: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);
                break;
            };
            case Action.merge_temp_next_temp2: {
                enableColor(merge_temp, skinEnabledColor);
                enableColor(merge_temp1, skinEnabledColor);
                enableColor(merge_temp2, skinEnabledColor);

                if (merge_temp && merge_temp2) {
                    const { x, y, z, linkToNext } = merge_temp;
                    if (linkToNext) {
                        linkToNext.target = merge_temp2;
                        linkToNext.refresh();
                        linkToNext.show();
                    }
                    await merge_temp2.move({ x: x + linkLength, y, z }, duration, () => {
                        merge_temp.linkToNext?.refresh();
                        merge_temp2.linkToNext?.refresh();
                    })
                }
                break;
            };
            case Action.merge_return_dummy_head_next: {
                merge_dummyHead?.linkToNext?.hide();
                merge_dummyHead?.hide();
                break;
            };
            case Action.sort_entry: {
                enableColor(sort_head, skinEnabledColor);
                enableColor(sort_tail, skinEnabledColor);
                break;
            };
            case Action.sort_head_equal_null: return [23];
            case Action.sort_return_head: return [24];
            case Action.sort_head_next_equal_tail: {
                enableColor(sort_head, skinEnabledColor);
                enableColor(sort_tail, skinEnabledColor);
                break;
            }
            case Action.sort_head_next_null: {
                enableColor(sort_head, skinEnabledColor);
                enableColor(sort_tail, skinEnabledColor);
                sort_head?.linkToNext?.hide();
                break;
            };
            case Action.sort_return_head_two: return [];
            case Action.sort_define_slow_fast: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_meet_while_condition: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_while_slow_slow_next: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_while_fast_fast_next: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_while_meet_fast_not_equal_tail: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_while_nest_fast_fast_next: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_sort1: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_sort2: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                break;
            };
            case Action.sort_return_merge: {
                enableColor(sort_head, skinSecondaryColor);
                enableColor(sort_tail, skinSecondaryColor);
                enableColor(sort_slow, skinEnabledColor);
                enableColor(sort_fast, skinEnabledColor);
                enableColor(sort_list1, skinEnabledColor);
                enableColor(sort_list2, skinEnabledColor);
                break;
            };
            case Action.sort_list_sort: {
                enableColor(head, skinEnabledColor);
                break;
            };
        }
    }

    const push = async () => {
        setState(State.Typing);

        const step = steps[index];

        if (!step) return;

        await safeRun(() => execute(step), animate, cancelAnimate);
        await safeRun(() => wait(0.1), animate, cancelAnimate);

        const last = steps[steps.length - 1];
        if (step === last) {
            setState(State.Finished);
        } else {
            setState(State.Playing);
        }

        setIndex(i => i + 1);
    }

    return (
        <>
            <MainPosition>
                <Button
                    sx={{ zIndex: 3 }}
                    onClick={push}
                    startIcon={state === State.Finished ? <CheckIcon /> : <MouseIcon />}
                    disabled={state !== State.Playing}
                    size="large"
                    variant='outlined'
                    color='success'
                >
                    Next
                </Button>
            </MainPosition>
            {displayCode && <Code />}
        </>
    );
}

export default Play;
