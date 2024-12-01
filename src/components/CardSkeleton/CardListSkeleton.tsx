import CardSkeleton from "@/components/CardSkeleton/CardSkeleton";

const CardListSkeleton = () => {
  return (
    <>
      {[...new Array(9)].map((_, index) => (
        <CardSkeleton key={index}/>
      ))}
    </>
  );
};

export const CardListSkeletonItems = () => {
  return [...new Array(9)].map((_, index) => <CardSkeleton key={index}/>);
};

export default CardListSkeleton;
