import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import shortid from "shortid";
import Modal from "react-modal/lib/components/Modal";
import "./Carparking.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "50%",
    width: "400px",
    transform: "translate(-50%, -50%)",
    // overflow: 'visible',
    padding: 0,
    border: "none",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
};

function Carparking() {
  const [lots, SetLots] = useState([]);
  const [full, setFull] = useState();
  const [openModels, setOpenModels] = useState(false);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  let lotList = [];
  const onSubmit = (data) => {
    console.log(data);
    for (let i = 1; i <= data.lot; i++) {
      lotList.push({
        // id: shortid.generate(),
        number: i,
        status: "active",
      });
    }
    SetLots(lotList);
  };

  console.log("ksksk", lots);

  const onHandleSubmit = (data) => {
    let index = lots.findIndex((x) => x.status === "active");
    if (index === -1) {
      console.log("err");
      // setFull("Park slot Is Full");
      alert("Park slot Is Full");
    }
    let list = [...lots];
    list[index].status = "inactive";
    list[index].register = data.carNumber;
    list[index].time = new Date();
    SetLots(list);
    console.log("lsit", list);
  };

  // function closePopup() {
  //   setOpenModels(false);
  // }

  const removePark = (index) => {
    let list = [...lots];

    list[index].status = "active";
    list[index].register = "";
    list[index].time = new Date();
    SetLots(list);
    alert("2 hours = $10");

    // closePopup(true);
    // if (list.register) {
    //   closePopup();
    // }
  };

  return (
    <div className="car-parking">
      <div className="d-flex parking-slot">
        <div className="lot-park col-md-3 gap-4 m-auto align-items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column "
          >
            <input
              type="number"
              {...register("lot", {
                min: 1,
                max: 20,
                required: "Lots is required",
              })}
              placeholder="Enter Lots"
            />
            <br />
            <p className="text-danger">{errors.lot?.message}</p>

            <button className="btn btn-warning" type="submut">
              Submit
            </button>
          </form>
        </div>

        <CarBooking Submit={onHandleSubmit} />
      </div>
      {/* <h1 className="text-warning text-center mb-4">{full}</h1> */}
      <div className="booking-slots">
        {lots.map((items, index) => {
          return (
            <div
              className={`park-box shadow p-3 mb-5 ${
                items.status === "inactive" ? "bg-success" : "bg-body"
              } rounded `}
              key={index}
            >
              <p>{items.number}</p>
              {/* <h1 className="text-danger">{items.status}</h1> */}

              {items.status === "inactive" ? (
                <>
                  <h1>{items.register}</h1>
                  <button
                    className="btn btn-danger col-sm-6"
                    // onClick={() => setOpenModels(true)}

                    onClick={() => removePark(index)}
                  >
                    Leave
                  </button>

                  <Modal
                    isOpen={openModels}
                    style={customStyles}
                    contentLabel="pay bill"
                  >
                    <div className="park-bill">
                      <h1 className="fs-3 mb-3">First 2 hours : $10</h1>
                      <button
                        className="btn btn-danger col-sm-6 "
                        onClick={() => removePark(index)}
                      >
                        Pay
                      </button>
                    </div>
                  </Modal>
                </>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carparking;

const CarBooking = ({ Submit }) => {
  // const [car, setCar] = useState();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  // console.log("car", car);
  return (
    <div className="book-car-slot col-md-3 gap-4 m-auto align-items-center">
      <form onSubmit={handleSubmit(Submit)} className="d-flex flex-column ">
        <input
          type="text"
          {...register("carNumber", {
            required: "Car  Number is required",
          })}
          placeholder="Enter Register Number"
        />
        <br />
        <p className="text-danger">{errors.carNumber?.message}</p>

        <button
          // className={(isValid ? "enablebtn " : "disablebtn", "col-md-4")}
          className="btn btn-primary"
          type="submut"
          // disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
