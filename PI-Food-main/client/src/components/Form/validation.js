
export function validation(input){
    const error = {};

    if(input.title.length < 2 || input.title.length > 30){
        error.title = '*name must have between 2 and 30 characters';
    }else if(!/^[a-zA-Z0-9\s]*$/.test(input.title)){
        error.title ="*you can't use special characters in the name";
    }else {error.title=''}

    if(input.summary.length < 30){
        error.summary ='*summary must have at least 30 characters'
    }else {error.summary= ''}

    if(input.healthScore <= 0){
        error.healthScore= '*healthscore cannot be less or equal to zero'
    }else{error.healthScore=''}

    if(input.steps.length < 30){
        error.steps= '*steps must have at least 30 characters'
    }else{error.steps=''}

    if(!/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(input.image)){
        error.image='*use a valid URL'
    }else {error.image=''}
    if(input.diets.length === 0){
        error.diets='*choose at least one diet'
    }else{error.diets=''}

    if(!error.title && !error.summary && !error.healthScore && !error.steps && !error.diets &&!error.image ){ error.btn='Activate'
}else{error.btn=''}
    return error
}