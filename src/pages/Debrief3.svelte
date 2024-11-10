<!-- this page is the debrief that collects post survey questions;
    there is a single button that saves responses to firebase and submits HIT  -->

    <script>
        import { db, params, serverTime, experiment, userGroup } from '../utils'
        import { createEventDispatcher } from 'svelte';


        const ratingsPath = `${experiment}/ratings`;
	    const ratingsDoc = db.doc(ratingsPath);
	    const subjectGroupPath = `${experiment}/subjects/${userGroup}`;
	    const subjectGroupCollection = db.collection(subjectGroupPath);
	    const stimuliPath = `${experiment}/stimuli`;
	    const stimuliDoc = db.doc(stimuliPath);

        const dispatch = createEventDispatcher();
        
        // populating necessary variables
        
        export let email;
        export let videoIndex;
  
        export let ratingType;
	    export let movies;
	    export let options;
	    export let links;
	    export let index; 
        export let movieIndices;

        let emailAddress = "mailto:" + email;
        let currID = params.assignmentId;
        let postURL = 'https://www.prolific.com/'
        let moviesRemaining = [];
        let numVideos = 9;

        let currVid;
	    let currVidSrc;
	    let ratingDocPathway;
        let botCheck = 2;
       let answer = '';

        if (options > 0) {
		// choose random movie and rating type
		currVid = movies[index];

		let vidPlusRating = `${currVid}-${ratingType}`;

		ratingDocPathway = `${ratingsPath}/${params.workerId}/${vidPlusRating}`;

		// grab URL for video sourcing
		currVidSrc = links[index];
	
        }
        let Main_question = ['1.   What is NOT true regarding the chicken production process and livestock transport described in the clip?', '1. What is NOT true about livestock transport and slaughterhouse practices for sheep and cattle?', 'Which statement is NOT true about the information described in the clip?', 'Which statement is NOT true about the fate of dairy cows in the industry?', '1.    	What is NOT accurate about pig farming practices?', '1.    What is NOT correct about the life for piglets on factory farms?', ' Which statement is NOT true about the information described in the clip?', '1.    	What is NOT accurate about toxicity testing on animals?', '1.    	What is NOT true about the experiences of animals in long-term toxicity tests?'];

let Answer_a = ['A) Male chicks in the egg industry are often killed shortly after hatching.', 'A) Cattle are killed in slaughter boxes using a captive bolt gun. ','In some places, cattle and sheep are killed unconscious to meet religious requirements.', 'A) Calves are often separated from their mothers on their first day of life.', 'A) Calves normally feed from their mothers at least six times a day.', 'A) Mother pigs are individually confined in factory farms.', 'A) Piglets are raised until one year before being slaughtered.', 'A) Millions of animals endure toxicity testing for product development.', 'A) Toxicity testing includes drugs', 'pesticides', 'and household products.', 'A) Pain relief is avoided as it interferes with test results.'];

let Answer_b = ['B) Many chickens raised for meat suffer lameness due to rapid growth.', 'B) In modern Western slaughterhouses, sheep are rendered unconscious with an electric shock.', 'B) A few male calves are kept for breeding in dairy production.', 'B) Dairy cows remain in the milking herd until they are old.', 'B) Pigs experience depression and anxiety in restricted conditions.', 'B) Male piglets are castrated without pain relief.', 'B) The global pig industry deems its slaughter practices acceptable.', 'B) Substances may be applied to shaved skin or inhaled via masks.', 'B) Testing doses may be given repeatedly for weeks or even a lifetime.']
let Answer_c = ['C) Pain relief is not required for mulesing and tail docking in lambs.', 'C) In some places, cattle and sheep are killed while unconscious to meet religious requirements.', 'C) Millions of male calves are killed as by-products of milk production each year.', 'C) Dairy cows are transported to slaughterhouses after being separated from the herd.', 'C) Mother pigs are allowed to make nests for comfort when giving birth.', 'C) Piglets remain with their mothers for at least two weeks.', 'C) Research institutions claim animals are well-cared for in testing.', 'C) Animals are exposed to toxic substances in amounts based on their body weight.', 'C) Animals are exposed to toxic substances in amounts based on their body weight.', 'C) Animals are killed and dissected at the end of testing procedures.'];
let Answer_d = ['D) Meat chickens are selectively bred to grow at a rate three times faster than normal.', 'D) Heat stress is a significant risk for animals transported in the summer.', 'D) Dairy cows are impregnated annually to maintain milk production.', 'D) Electric shock is used to render calves unconscious before slaughter.', 'D) Pigs are highly social animals that enjoy companionship.', 'D) Weak or sick piglets may be killed by blunt force trauma.', 'D) Workers never harm animals during toxicity testing processes.', 'D) Some substances are given orally or injected.', 'D) Alternatives to animal testing are not available in modern science.'];
let Answer_e =['E) Disbudding is performed on male calves to prevent horn growth.', 'E) Injured or ill animals are treated as acceptable losses not given immediate treatment.', 'E) Male calves are sometimes transported to slaughterhouses weekly by the thousands.', 'E) Calves are moved into a conveyor system during slaughter.', 'E) Mother pigs movement is restricted when pregnant or feeding.', 'E) Ten to twenty percent of piglets do not survive their first few weeks.', 'E) Toxicity testing involves animals enduring suffering and confinement.', 'E) Chemicals may be applied to animals eyes', 'E) Workers may become emotionally distant from animals over time.'];
console.log(ratingDocPathway)



     
        const newPage = async () =>{   
            if (videoIndex % botCheck == 0 && videoIndex != numVideos){
            
                dispatch("botcheck")
                await db.doc(ratingDocPathway).update({
                Comphrehension: answer
                });    
            }   else

                dispatch("finished")
                await db.doc(ratingDocPathway).update({
                   Comphrehension: answer
                
                });    
        
        }
      
    </script>
   
    <style>
        .container {
            margin: 0 auto !important; 
            max-width: 800px;
            text-align: center;
        }
        .form-box {
            padding: 2%;
                background-color: rgba(255, 255, 255, 0.6);
            border-left: 2px solid #aaa;
                border-radius: 2px;
                box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);   
            text-align: left;
        }
            .label {
            font-weight: bold;
        }
            
        .button {
            background-color: lightblue;
        }
    </style>
    
    <div class="container">
        <div class="form-box">
            <form name="mturk" action={postURL} method='POST'>
                <h2> Please answer the following question, then press “NEXT PAGE” to continue to the next video.  </h2>
           

                <input type="hidden" name="assignmentId" id="assignmentId" value={currID}>
                <input type="hidden" name="hidden_val_DONT_REMOVE" value="1">


                                        <label class="label"
            ><u>       {Main_question[movieIndices[videoIndex]]}  </u>
            <div class="options">
                <label class="radio">
                    <input type="radio" bind:group={answer} value={"A"} />
                    {Answer_a[movieIndices[videoIndex]]}
                </label>
                <label class="radio">
                    <input type="radio" bind:group={answer} value={"B"} />
                    {Answer_b[movieIndices[videoIndex]]}                </label>
                <label class="radio">
                    <input type="radio" bind:group={answer} value={"C"} />
                    {Answer_c[movieIndices[videoIndex]]}  
                </label>
                <label class="radio">
                    <input type="radio" bind:group={answer} value={"D"} />
                    {Answer_d[movieIndices[videoIndex]]}  
                </label>
                <label class="radio">
                    <input type="radio" bind:group={answer} value={"E"} />
                    {Answer_e[movieIndices[videoIndex]]}  
                </label>
                <br />
            </div>
        </label>

                 
                
                        
                <div class="field-label">
                    <!-- Left empty for spacing -->
                </div> 
                <br>
                <button class="button is-success is-large" on:click={newPage}>NEXT PAGE</button>         
            </form>
        </div> 
    </div>
