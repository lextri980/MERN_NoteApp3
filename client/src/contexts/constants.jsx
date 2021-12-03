export const url =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000'
		: 'someURL'

export const LOCAL_STORAGE_TOKEN_NAME = 'authentication'

//Auth section
export const SET_AUTH = 'SET_AUTH'

//LinkCard section
export const LINKCARD_LOADED_SUCCESS = 'LINKCARD_LOADED_SUCCESS'
export const LINKCARD_LOADED_FAIL = 'LINKCARD_LOADED_FAIL'
export const CREATE_LINKCARD = 'CREATE_LINKCARD'
export const DELETE_LINKCARD = 'DELETE_LINKCARD'
export const FIND_LINKCARD = 'FIND_LINKCARD'
export const UPDATE_LINKCARD = 'UPDATE_LINKCARD'

//Note section
export const NOTE_LOADED_SUCCESS = 'NOTE_LOADED_SUCCESS'
export const NOTE_LOADED_FAIL = 'NOTE_LOADED_FAIL'
export const CREATE_NOTE = 'CREATE_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const FIND_NOTE = 'FIND_NOTE'
export const UPDATE_NOTE = 'UPDATE_NOTE'

//Profile section
export const FIND_PROFILE = 'FIND_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

