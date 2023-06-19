import { fireEvent, render } from "@testing-library/react";
import { AutoCompleteTextFieldRender } from "./AutoCompleteTextFieldRender";

describe("AutoCompleteTextFieldRender", () => {
  it("Test that component renders without crashing.", () => {
    render(
      <AutoCompleteTextFieldRender label="test" children={<div>Test</div>} />
    );
  });
  it("Test that component renders a TextField", () => {
    const { container } = render(
      <AutoCompleteTextFieldRender label="test" children={<div>Test</div>} />
    );
    expect(container.querySelector("input")).toBeInTheDocument();
  });
  it("Test that the label prop is correctly passed to the TextField.", () => {
    const { getByLabelText } = render(
      <AutoCompleteTextFieldRender label="test" children={<div>Test</div>} />
    );
    expect(getByLabelText("test")).toBeInTheDocument();
  });
  it("Test that the children prop is correctly used in the InputAdornment component.", () => {
    const { getByText } = render(
      <AutoCompleteTextFieldRender label="test" children={<div>Test</div>} />
    );
    expect(getByText("Test")).toBeInTheDocument();
  });
  it("Test that the startAdornment prop is correctly set on the InputProps.", () => {
    const { container } = render(
      <AutoCompleteTextFieldRender label="test" children={<div>Test</div>} />
    );
    expect(
      container.querySelector(".MuiInputAdornment-positionStart")
    ).toBeInTheDocument();
  });
  it("Test that the component correctly passes any additional props to the TextField.", () => {
    const onChange = jest.fn();
    const { container } = render(
      <AutoCompleteTextFieldRender
        label="test"
        children={<div>Test</div>}
        onChange={onChange}
      />
    );
    fireEvent.change(container.querySelector("input"), {
      target: { value: "test" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
