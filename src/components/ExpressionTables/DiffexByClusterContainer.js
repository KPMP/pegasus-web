import { connect } from "react-redux";
import DiffexByCluster from "./DiffexByCluster";
import { withRouter } from 'react-router';
import { setGene } from "../../actions/Gene/geneActions";
import { setAccession } from "../../actions/Accession/accessionActions";
import { setDataType } from "../../actions/DataType/dataTypeActions";

const mapStateToProps = (state, props) =>
({
    dataType: state.dataType,
    cluster: state.cluster,
    enrollmentCategory: state.enrollmentCategory
});

const mapDispatchToProps = (dispatch, props) =>
    ({
        setGene(gene, dataType) {
            dispatch(setGene(gene));
            if (dataType === 'rt') {
                dispatch((dispatch) => window.open("/explorer/regionalviz", '_self'));
            } else if (dataType === 'rp') {
                dispatch((dispatch) => window.open("/explorer/regionalpro", '_self'));
            } else {
                dispatch((dispatch) => window.open("/explorer/dataviz", '_self'));
            }
        },
        setDataType(dataType) {
            dispatch(setDataType(dataType));
        },
        setAccession(accession){
          dispatch(setAccession(accession));
        }
    });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DiffexByCluster))
