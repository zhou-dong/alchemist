import { styled } from '@mui/system';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import { useAlgoContext } from "./AlgoContext";
import { wait } from '../../../data-structures/_commons/utils';
import { State } from './AlgoState';
import { duration, skinDefaultColor } from './styles';
import { LinkedListNode } from '../../../data-structures/list/linked-list/node.three';
import { Action, Step } from './stepsBuilder';
import Code from "./Code";
import MouseIcon from '@mui/icons-material/Mouse';
import { safeRun } from '../../commons/utils';
import { buildLink } from './AlgoInput';

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
    const { animate, cancelAnimate, state, setState, index, steps, setIndex, displayCode, scene } = useAlgoContext();

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
            case Action.merge_entry: return [1];
            case Action.merge_new_dummy_head: return [2];
            case Action.merge_define_temp_temp1_temp2: return [3];
            case Action.merge_meet_while_condition: return [4];
            case Action.merge_while_temp1_less_than_temp2: return [5];
            case Action.merge_while_temp_next_temp1: return [6];
            case Action.merge_while_temp1_temp1_next: return [7];
            case Action.merge_while_temp1_large_than_temp2: return [8];
            case Action.merge_while_temp_next_temp2: return [9];
            case Action.merge_while_temp2_temp2_next: return [10];
            case Action.merge_while_temp_temp_next: return [12];
            case Action.merge_temp1_not_null: return [14];
            case Action.merge_temp_next_temp1: return [15];
            case Action.merge_temp2_not_null: return [16];
            case Action.merge_temp_next_temp2: return [17];
            case Action.merge_return_dummy_head_next: return [19];
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

        // resetColor(evenHead);
        // resetColor(even);
        // resetColor(odd);

        // switch (action) {
        //     case Action.define_odd: {
        //         enableColor(odd, skinEnabledColor);
        //         if (odd) {
        //             const { x, y, z } = odd;
        //             await odd.move({ x, y: y - 2, z }, duration, () => {
        //                 odd.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.define_even_head: {
        //         enableColor(evenHead, skinEnabledColor);
        //         break;
        //     }
        //     case Action.define_even: {
        //         enableColor(even, skinEnabledColor);
        //         if (even) {
        //             const { x, y, z } = even;
        //             await even.move({ x, y: y - 6, z }, duration, () => {
        //                 even.linkToNext?.refresh();
        //                 odd?.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.odd_next_to_even_next: {
        //         const next = even?.next;
        //         if (odd && next) {
        //             enableColor(next, skinEnabledColor);
        //             odd.next = next;
        //             if (!odd.linkToNext) {
        //                 odd.linkToNext = buildLink(scene, odd, next);
        //             }
        //             odd.linkToNext!.target = next;
        //             odd.linkToNext?.refresh();

        //             const { x, y, z } = next;
        //             await next.move({ x, y: y - 2, z }, duration, () => {
        //                 next.linkToNext?.refresh();
        //                 odd.linkToNext?.refresh();
        //                 even.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.odd_to_odd_next: {
        //         enableColor(odd, skinEnabledColor);
        //         break;
        //     }
        //     case Action.even_next_to_odd_next: {
        //         const next = odd?.next;
        //         if (!next) {
        //             even?.linkToNext?.hide();
        //         }
        //         if (even && next) {
        //             enableColor(next, skinEnabledColor);
        //             even.next = next;
        //             even.linkToNext!.target = next;
        //             const { x, y, z } = next;
        //             await next.move({ x, y: y - 6, z }, duration, () => {
        //                 next.linkToNext?.refresh();
        //                 odd.linkToNext?.refresh();
        //                 even.linkToNext?.refresh();
        //             });
        //         }
        //         break;
        //     }
        //     case Action.even_to_even_next: {
        //         enableColor(even, skinEnabledColor);
        //         break;
        //     }
        //     case Action.odd_next_to_even_head: {
        //         enableColor(evenHead, skinEnabledColor);
        //         if (odd && evenHead) {
        //             odd.next = evenHead;
        //             if (!odd.linkToNext) {
        //                 odd.linkToNext = buildLink(scene, odd, evenHead);
        //                 odd.linkToNext?.show();
        //             }
        //             odd.linkToNext!.target = evenHead;
        //             odd.linkToNext?.refresh();
        //         }
        //         break;
        //     }
        //     case Action.return_head: {
        //         break;
        //     }
        // }
    }

    const push = async () => {
        setState(State.Typing);
        console.log(index);

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
