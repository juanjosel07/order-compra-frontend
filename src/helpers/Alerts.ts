import Swal from "sweetalert2";
export const deleteMessage = async () => {
  const { isConfirmed } = await Swal.fire({
    icon: "warning",
    title: "Estas seguro?",
    text: "No podras revertir esta accion",
    showCancelButton: true,
  });
  return isConfirmed;
};
