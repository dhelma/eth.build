function Condition() {
      this.addInput("A", "");
      this.addInput("B", "");
      this.addOutput("true", "boolean");
      this.addOutput("event", -1);


      this.addProperty("OP", ">", "enum", { values: Condition.values });

      this.properties = {A:1,B:1}
      this.size[0] = 130
  }

  Condition.desc = "compare values equals not equals"

  Condition.values = [">", "<", "==", "!=", "<=", ">=", "||", "&&" ];
  Condition["@OP"] = {
      type: "enum",
      title: "operation",
      values: Condition.values
  };

  Condition.title = "Condition";

  Condition.prototype.getTitle = function() {
      return "A " + this.properties.OP + " B";
  };

  Condition.prototype.onPropertyChange = function(property, value) {
    this.properties[property] = value
    this.triggered = false
  }

  Condition.prototype.onExecute = function() {
      var A = this.getInputData(0);
      if (A === undefined) {
          A = this.properties.A;
      } else {
        this.onPropertyChange("A",A)
      }

      var B = this.getInputData(1);
      if (B === undefined) {
          B = this.properties.B;
      } else {
          this.onPropertyChange("B",B)
      }

      var result = true;
      switch (this.properties.OP) {
          case ">":
              result = A > B;
              break;
          case "<":
              result = A < B;
              break;
          case "==":
              result = A == B;
              break;
          case "!=":
              result = A != B;
              break;
          case "<=":
              result = A <= B;
              break;
          case ">=":
              result = A >= B;
              break;
          case "||":
              result = A || B;
              break;
          case "&&":
              result = A && B;
              break;
      }

      this.setOutputData(0, result);
      if(result&&!this.triggered){
        this.trigger("event");
        this.triggered = true
      }
  };

export default Condition