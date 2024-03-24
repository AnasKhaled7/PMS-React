import noData from "../../../assets/images/noData.jpg";

export default function NoData() {
  return (
    <>
      <div className="w-50 mx-auto text-center">
        <img src={noData} className="w-100" />
        <h4 className="textStyle">There is no data yet!</h4>
      </div>
    </>
  );
}
