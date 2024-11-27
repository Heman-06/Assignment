import { db } from "../config";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const tasksCollectionRef = collection(db, "tasks");

export const createTask = async (title, description) => {
  await addDoc(tasksCollectionRef, { title, description });
};

export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollectionRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTask = async (id, title, description) => {
  const taskDoc = doc(db, "tasks", id);
  await updateDoc(taskDoc, { title, description });
};

export const deleteTask = async (id) => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};
