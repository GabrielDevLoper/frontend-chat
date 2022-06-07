import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError, Controller, Control } from "react-hook-form";
import { Select } from "chakra-react-select";
import { StylesConfig } from "react-select";

interface SelectProps {
  name: string;
  data: any[];
  label?: string;
  error?: FieldError;
  isLoading?: boolean;
  isMulti?: boolean;
  control?: Control;
  removeSelectOption?: boolean;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  {
    name,
    label,
    error = null,
    data,
    isLoading,
    isMulti = false,
    control,
    removeSelectOption = false,
    ...rest
  },
  ref
) => {
  const chakraStyles: StylesConfig<true> = {
    // When disabled, react-select sets the pointer-state to none
    // which prevents the `not-allowed` cursor style from chakra
    // from getting applied to the Control
    container: (provided) => ({
      ...provided,
      pointerEvents: "auto",
    }),

    singleValue: (provided, teste) => {
      return {
        ...provided,
      };
    },
    input: (provided) => ({
      ...provided,
      color: "inherit",
      lineHeight: 1,
    }),
    valueContainer: (provided) => {
      return {
        ...provided,
        background: "white",
      };
    },
    // Add the chakra style for when a TagCloseButton has focus
    multiValueRemove: (provided) => {
      return {
        ...provided,
        color: "white",
        background: "red",
      };
    },

    loadingIndicator: (provided) => {
      return {
        ...provided,
        color: "blue",
      };
    },
    multiValueLabel: (provided) => {
      return {
        fontSize: "16px",
      };
    },
    multiValue: (provided) => {
      return {
        ...provided,
        background: "red",
      };
    },
  };

  // const { removeSelectMaterialOption, setRemoveSelectionOption } =
  //   useRemoveSelectionOption();

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={label} color="gray.800">
          {label}
        </FormLabel>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Select
              name={name}
              options={data}
              isLoading={isLoading}
              isSearchable={true}
              isClearable={true}
              isMulti={isMulti}
              noOptionsMessage={({ inputValue }) =>
                !inputValue ? "Começe a digitar..." : "Nenhum encontrado"
              }
              onChange={(e) => {
                onChange(e);
              }}
              onBlur={onBlur}
              value={value}
              placeholder="Selecione"
              closeMenuOnSelect={isMulti ? false : true}
              styles={chakraStyles}
            />
          </>
        )}
        name={name}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Selects = forwardRef(SelectBase);
