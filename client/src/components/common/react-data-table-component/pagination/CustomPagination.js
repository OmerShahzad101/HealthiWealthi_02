import styles from './pagination.module.scss'

const CustomPagination = () => {
    return (
        <div className={styles.Pagination}>
<p>Displaying</p>
<label for="pagination">Displaying</label>
  <select name="pagination" id="pagination">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="30">30</option>
    <option value="">40</option>
  </select>
        </div>
    )
}

export default CustomPagination
