import type { UseThreeProps } from '../../../hooks/useThree';
import { WrapperProvider } from '../wrapper/WrapperProvider';

function OrderStatisticsPageContent({ renderer, scene, camera }: UseThreeProps) {


    return (
        <>

        </>
    );
}

export default function OrderStatisticsPage({ renderer, scene, camera }: UseThreeProps) {
    return (
        <WrapperProvider title="Order Statistics" activeStep={0}>
            <OrderStatisticsPageContent renderer={renderer} scene={scene} camera={camera} />
        </WrapperProvider>
    );
}
