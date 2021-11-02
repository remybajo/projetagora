export default function(commentairesList = [], action){
    if(action.type == 'updateLikes'){
        return action.listComments
    } else {
        return commentairesList
    }
}