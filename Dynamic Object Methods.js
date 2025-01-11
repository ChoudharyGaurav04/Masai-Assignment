let  sentenceBuilder = {
    subject: "I",
    verb: "am",
    object: "coding",
    
    buildSentence: function() {
      
      return (this.subject && this.verb && this.object)   ? this.subject + " " + this.verb + " " + this.object 
        : "Incomplete sentence";
    },
    
    updateProperty: function(property, value) {
      
        if (property === "subject") {
            this.subject = value;
          } else if (property === "verb") {
            this.verb = value;
          } else if (property === "object") {
            this.object = value;
          } else {
            return "Invalid property";
          }
    }
  };

  console.log(sentenceBuilder.buildSentence());
  sentenceBuilder.updateProperty("verb", "am learning");

  console.log(sentenceBuilder.buildSentence());