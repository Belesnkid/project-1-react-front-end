import Employee from "../dtos/employee";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewEmployeeDetails(props:{emp:Employee, submittedRequests:ReimbursementRequest[]}){

    
    
    return(<>
            <h3>Details for {props.emp.fName} {props.emp.lName}</h3>
            <div>
                <hr/>
                <div className="center">
                <p>ID: {props.emp.id}</p>
                <p>Total Requests: {props.submittedRequests.length}</p>
                <p>Total Open Requests: {numOpen()}</p>
                <p>Highest Expenditure: {highest()}</p>
                <p>Median Expenditure: {median()}</p>
                <p>Average Expenditure: {average()}</p>
                </div>
            </div>
       
    </>)

    function sortArr(arr:ReimbursementRequest[]):ReimbursementRequest[]{
        let myArr = arr;
        myArr.sort(function(a,b){
            return a.amount - b.amount;
        })
        return myArr;
    }

    function median(){
        if(props.submittedRequests.length === 0){
            return "No Requests Submitted";
        }
        else if(props.submittedRequests.length === 1){
            return props.submittedRequests[0].amount;
        }
        else if(props.submittedRequests.length === 2){
            return ((props.submittedRequests[0].amount + props.submittedRequests[1].amount) / 2)
        }
        else if (props.submittedRequests.length >= 3){
            const sorted = sortArr(props.submittedRequests);
            if(sorted.length % 2 === 1){
                return sorted[Math.floor(sorted.length/2)].amount;
            }
            else{
                const rightIndex = Math.floor(sorted.length/2);
                return ((sorted[rightIndex].amount + sorted[rightIndex-1].amount) / 2);
            }
        }
    }

    function average(){
        if(props.submittedRequests.length > 0){
            let sum = 0;
            for(let r of props.submittedRequests){
                sum += r.amount;
            }
            return Number.parseFloat((sum/props.submittedRequests.length).toFixed(2));
        }
        else{
            return "No Requests Submitted";
        }
    }

    function numOpen(){
        let open = 0;
        for (let r of props.submittedRequests){
            if(r.pending){
                open++;
            }
        }
        return open;
    }

    function highest(){
        let amt = 0;
        for (let r of props.submittedRequests){
            if(r.amount > amt){
                amt = r.amount;
            }
        }
        return amt;
    }
}
