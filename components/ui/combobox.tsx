"use client";
import React, { useState } from "react";
import { Combobox } from "@headlessui/react";

interface Person {
  label: string;
  value: string;
}

interface ComboboxProps {
  selectedPerson: Person;
  setSelectedPerson: React.Dispatch<React.SetStateAction<Person>>;
  List: Person[];
  onSubmit: (value: string) => void;
}

const MyCombobox: React.FC<ComboboxProps> = ({
  selectedPerson,
  setSelectedPerson,
  List,
  onSubmit,
}) => {
  const [query, setQuery] = useState("");
  function onSubmitHandler(person: Person) {
    onSubmit(person.value);
  }
  const filteredList =
    query === ""
      ? List
      : List.filter((person) =>
          person.label.toLowerCase().includes(query.toLowerCase())
        );
  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      {({ open }) => (
        <>
          <Combobox.Input
            className="border relative p-2 w-[90%] rounded-md focus:outline-none"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(person: Person) => person.label}
        
          />
          <Combobox.Options
            className={`z-30 absolute w-[70%] md:w-[20%] flex-col justify-center bg-gray-300 mt-1 ${
              open ? "block" : "hidden"
            }`}
          >
            {filteredList.map((person) => (
              <Combobox.Option key={person.value} value={person}>
                {({ active }) => (
                  <div
                    className={`cursor-pointer rounded-md p-2 ${
                      active ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`}
                    onClick={(e) => {
                      onSubmitHandler(person);
                    }}
                  >
                    {person.label}
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
};

export default MyCombobox;
