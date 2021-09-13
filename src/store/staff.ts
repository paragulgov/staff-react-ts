import { makeAutoObservable, runInAction } from 'mobx'
import { MemberType } from '../utils/models'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, Timestamp, updateDoc } from 'firebase/firestore'
import { enableLogging } from 'mobx-logger'
import { IFormInput } from '../components/UI/MemberForm'

const config = {
  predicate: () => true,
  action: true,
  reaction: false,
  transaction: true,
  compute: true,
}

enableLogging(config)

class Staff {
  load = false
  staffList: MemberType[] = []
  currentMember = {} as MemberType

  constructor() {
    makeAutoObservable(this)
  }

  setLoad = (value: boolean) => {
    this.load = value
  }

  setCurrentMember = (id: string) => {
    this.currentMember = this.staffList.find(item => item.id === id)!
  }

  fetchStaff = async () => {
    this.setLoad(true)
    const db = getFirestore()

    const result = await getDocs(collection(db, 'staff'))
    const newData: MemberType[] = []

    result.forEach((doc) => {
      newData.push({
        id: doc.id,
        fullName: doc.data().fullName,
        gender: doc.data().gender,
        post: doc.data().post,
        employment: doc.data().employment,
        birthDate: doc.data().birthDate
      })
    })

    runInAction(() => {
      this.staffList = newData
      this.load = false
    })
  }

  createMember = async (value: IFormInput) => {
    this.setLoad(true)
    const db = getFirestore()

    const dateMills = Timestamp.fromDate(new Date(value.birthDate)).toMillis()

    const docRef = await addDoc(collection(db, 'staff'), {
      ...value,
      birthDate: dateMills
    })

    runInAction(() => {
      this.staffList.unshift({
        id: docRef.id,
        ...value,
        birthDate: dateMills
      })
    })

    this.setLoad(false)
  }

  updateMember = async (id: string, value: IFormInput) => {
    this.setLoad(true)
    const db = getFirestore()

    const dateMills = Timestamp.fromDate(new Date(value.birthDate)).toMillis()

    await updateDoc(doc(db, 'staff', id), {
      ...value,
      birthDate: dateMills
    })

    runInAction(() => {
      this.currentMember = {id, ...value, birthDate: dateMills}
    })

    this.setLoad(false)
  }

  deleteMember = async (id: string) => {
    this.setLoad(true)
    const db = getFirestore()

    await deleteDoc(doc(db, 'staff', id))

    runInAction(() => {
      this.staffList = this.staffList.filter(el => el.id !== id)
    })

    this.setLoad(false)
  }
}

export default new Staff()
