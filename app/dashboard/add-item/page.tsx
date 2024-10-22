import Container from '@/components/Container';
import ItemForm from '../_components/ItemForm';

function AddItemPage() {
  return (
    <Container>
      <h2 className="mb-4 text-2xl">Add Item</h2>

      <ItemForm actionType="add" />
    </Container>
  );
}

export default AddItemPage;
