import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";
import { showFormMsg, locationInputMsg, addLocationMsg, deleteLocationMsg } from "./Update";

const btnStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

const { div, button, form, label, input, table, thead, tbody, tr, th, td } = hh(h);

function cell(tag, className, value) {
  return tag({ className }, value);
}

const tableHeader = thead([tr([cell(th, "text-left", "Location"), cell(th, "text-left", "Temp"), cell(th, "text-left", "High"), cell(th, "text-left", "Low")])]);
                                                                                                                    
function locationRow(dispatch, className, meal) {
  return tr({ className }, [
    cell(td, "px-1 py-2", meal.location),
    cell(td, "px-1 py-2", meal.temp),
    cell(td, "px-1 py-2", meal.high),
    cell(td, "px-1 py-2", meal.low),
    cell(td, "px-1 py-2 text-right", [
      button(
        {
          className: "hover:bg-gray-200 p-2 rounded",
          onclick: () => dispatch(deleteLocationMsg(meal.id)),
        },
        "🗑"
      ),
    ]),
  ]);
}

function mealsBody(dispatch, className, locations) {
  const rows = R.map(R.partial(locationRow, [dispatch, "odd:bg-white even:bg-gray-100"]), locations);

  const rowsWithTotal = [...rows];

  return tbody({ className }, rowsWithTotal);
}

function tableView(dispatch, locations) {
  if (locations.length === 0) {
    return div({ className: "pt-8 text-center" }, "No Locations yet... 😢");
  }
  return table({ className: "mt-4" }, [tableHeader, mealsBody(dispatch, "", locations)]);
}

function fieldSet(labelText, inputValue, placeholder, oninput) {
  return div({ className: "grow flex flex-col" }, [
    label({ className: "text-gray-700 text-sm font-bold mb-2" }, labelText),
    input({
      className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700",
      placeholder,
      type: "text",
      value: inputValue,
      oninput,
    }),
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "flex gap-4 justify-end" }, [
    button(
      {
        className: `${btnStyle} bg-green-500 hover:bg-green-700`,
        type: "submit",
      },
      "Add"
    ),
    button(
      {
        className: `${btnStyle} bg-red-500 hover:bg-red-700`,
        type: "button",
        onclick: () => dispatch(showFormMsg(false)),
      },
      "Cancel"
    ),
  ]);
}

function formView(dispatch, model) {
  const { location, temp, showForm } = model;
  if (showForm) {
    return form(
      {
        className: "flex flex-col gap-4",
        onsubmit: (e) => {
          e.preventDefault();
          dispatch(addLocationMsg);
        },
      },
      [
        div({ className: "flex gap-4" }, [
          fieldSet("Location", location, "Enter location...", (e) => dispatch(locationInputMsg(e.target.value))),
        ]),
        buttonSet(dispatch),
      ]
    );
  }
  return button(
    {
      className: `${btnStyle} max-w-xs`,
      onclick: () => dispatch(showFormMsg(true)),
    },
    "Add"
  );
}

function view(dispatch, model) {
  return div({ className: "flex flex-col" }, [formView(dispatch, model), tableView(dispatch, model.locations)]);
}

export default view;
