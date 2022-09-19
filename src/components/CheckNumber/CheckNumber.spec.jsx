import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckNumber from ".";

function getInput() {
  const { getByPlaceholderText } = render(<CheckNumber/>);
  return getByPlaceholderText("Digite um número...");
}

describe("CheckNumber", () => {
  test("renders a title", () => {
    const { getByText } = render(<CheckNumber/>)

    expect(getByText("Par ou ímpar?")).toBeTruthy();
  });

  test("renders as input", () => {
    expect(getInput()).toBeTruthy();
  });

  describe("when there is no error", () => {
    test("renders the error message section empty", () => {
      const { queryByRole } = render(<CheckNumber/>);

      expect(queryByRole("alert")).toBeFalsy();
    })
  });

  describe("when the user types an odd number", () => {
    test("renders Ímpar on the screen", async () => {
      const { getByRole, getByPlaceholderText } = render(<CheckNumber/>);
      const input = getByPlaceholderText("Digite um número...");

      userEvent.clear(input);
      await userEvent.type(input, "1");

      expect(getByRole("presentation")).toHaveTextContent("Ímpar");
    })
  });

  describe("when the user types an even number", () => {
    test("renders Par on the screen", async () => {
      const { getByRole, getByPlaceholderText } = render(<CheckNumber/>);
      const input = getByPlaceholderText("Digite um número...");

      await userEvent.clear(input);
      await userEvent.type(input, "12");

      expect(getByRole("presentation")).toHaveTextContent("Par");
    })
  });

  describe("when the user types a not number value", () => {
    test("renders the error message on the screen", async () => {
      const { getByRole, getByPlaceholderText } = render(<CheckNumber/>);
      const input = getByPlaceholderText("Digite um número...");

      await userEvent.clear(input);
      await userEvent.type(input, "teste");

      expect(getByRole("alert")).toHaveTextContent("Valor inválido");
    })
  });
})