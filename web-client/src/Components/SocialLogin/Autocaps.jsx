class Autocaps {
  init = keyboard => {
    /**
     * Registering module
     */
    keyboard.registerModule("Autocaps", module => {
      module.fn = {};
      module.fn.handleButtonClicked = keyboard.handleButtonClicked;
      
      keyboard.handleButtonClicked = button => {
        module.fn.handleButtonClicked(button);

        let input = keyboard.getInput();


        if (button === "{space}") {
          keyboard.setOptions({
            layoutName: "shift"
          });
        } else if (input.charAt(input.length - 2) === " ") {
          keyboard.setOptions({
            layoutName: "default"
          });
        }
      };

      module.init = () => {
        keyboard.setOptions({
          layoutName: "shift"
        });
      };

      module.init();
    });
  };
}

export default Autocaps;
