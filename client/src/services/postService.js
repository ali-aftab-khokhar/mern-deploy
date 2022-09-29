import CONSTANTS from "../constants";
import BaseServiceClass from "./baseServiceClass";

class PostService extends BaseServiceClass {
    addNewPost(payload) {
        this.postMethod(payload, CONSTANTS.POSTED, CONSTANTS.NEW_POST_FAILED, 'posts')
    }

    deleteThePost(post_id) {
        this.deleteMethod(`posts/${post_id}`, CONSTANTS.DELETION_FAILED)
    }

    editThePost(payload, post_id) {
        this.putMethod(payload, CONSTANTS.EDITED, CONSTANTS.EDIT_FAILED, `posts/${post_id}`)
    }

    dislikeThePost(payload, post_id) {
        this.putMethod(payload, CONSTANTS.DISLIKED, CONSTANTS.DISLIKE_FAILED, `post/lod/${post_id}`)
    }

    likeThePost(payload, post_id) {
        this.putMethod(payload, CONSTANTS.LIKED, CONSTANTS.LIKE_FAILED, `post/lod/${post_id}`)
    }

    publishThePost(post_id) {
        const payload = {
            id: post_id
        }
        this.putMethod(payload, CONSTANTS.PUBLISHED_SUCCESSFULLY, CONSTANTS.PUBLISHED_FAILED, `post/${post_id}/publish`)
    }

    unpublishThePost(post_id) {
        const payload = {
            id: post_id
        }
        this.putMethod(payload, CONSTANTS.UNPUBLISHED_SUCCESSFULLY, CONSTANTS.UNPUBLISHED_FAILED, `post/${post_id}/unpublish`)
    }
}

export default PostService