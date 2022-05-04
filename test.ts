import * as Skol from "./src"

for(var i = 0;i < 6;i++)
    new Skol.Thread(function(data)
    {
        console.info(this.threadID)
    })