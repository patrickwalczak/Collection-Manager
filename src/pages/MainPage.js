import LatestItemsController from "../Components/MainPage/LatestItemsController";
import MainPageWrapper from "../Components/MainPage/MainPageWrapper";
import Cloud from "../Components/MainPage/Cloud";
import LargestCollections from "../Components/MainPage/CollectionsSection/LargestCollections";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <LargestCollections />
      <LatestItemsController />
      <Cloud />
    </MainPageWrapper>
  );
};
export default MainPage;
