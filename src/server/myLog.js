"use strict";
exports.__esModule = true;
function myLog(msg, msg2) {
    var time = new Date().toLocaleDateString('en-GB');
    if (msg2) {
        msg += ' ';
        while (msg.length < 30) {
            msg += '.';
        }
        msg += ' ' + msg2;
    }
    console.log("[" + time + "] " + msg);
}
exports.myLog = myLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJteUxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQWdCLEtBQUssQ0FBQyxHQUFXLEVBQUUsSUFBYztJQUNoRCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELElBQUksSUFBSSxFQUFFO1FBQ1QsR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNYLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUU7WUFDdkIsR0FBRyxJQUFJLEdBQUcsQ0FBQztTQUNYO1FBQ0QsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDbEI7SUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUksSUFBSSxVQUFLLEdBQUssQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFWRCxzQkFVQyJ9